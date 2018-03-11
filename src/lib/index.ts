import { AbiMethodTypes, Selector } from './abi/contract/index';
import { CreateContract } from './abi';
import { ProxiedNode, IProxiedNode } from './node';
import { IFunctionFactory, IFactory, IConstructorFactory } from './abi/function/typings';
import { IContract } from './abi/contract/typings';

//TODO move these interfaces into a typings folder
interface IHandleCallParams {
  userArgs: any[] | null;
  txObj: ICallTxObj;
  func: IFunctionFactory;
  node: IProxiedNode;
}

interface IHandleSendParams extends IHandleCallParams {
  txObj: ITransactionObj;
}

interface IHandleInitParams {
  userArgs: any[] | null;
  txObj: ITransactionObj;
  constructor: IConstructorFactory;
  node: IProxiedNode;
  contract: string;
}

const handleCall = async (args: IHandleCallParams) => {
  const { userArgs, func, node, txObj } = args;
  const data = func.encodeArguments(userArgs);
  const response = await node.eth_call({ data, ...txObj }); //TODO add rejection handling
  const parsedResponse = func.decodeReturnValue(response);
  return parsedResponse;
};

const handleSend = async (args: IHandleSendParams) => {
  const { userArgs, func, node, txObj } = args;
  const data = func.encodeArguments(userArgs);
  const response = await node.eth_sendTransaction({ data, ...txObj });
  const parsedResponse = func.decodeReturnValue(response);
  return parsedResponse;
};

const handleInit = async (args: IHandleInitParams) => {
  const { userArgs, constructor, node, txObj } = args;
  const data = `${txObj.data}${constructor.encodeArguments(args)}` //TODO move this into coders
  const response = await node.eth_sendTransaction({ data, ...txObj });
  return response;
}

const ConnectedContract = <T>(
  contract: IContract,
  node: IProxiedNode,
  defaultTxObj: Partial<ITransactionObj> = {}
) => {
  const routeCalls = {
    get(contract: IContract, propKey: any) {
      if (!Object.getOwnPropertyNames(contract).includes(propKey)) {
        return contract[propKey];
      }
      const contractMethod: IFactory = contract[propKey];
      if (!contractMethod) {
        throw Error(`${propKey} is not a valid contract method`);
      }
      switch(contractMethod.type){
        case(AbiMethodTypes.function):
         return (
          userArgs: any[],
          txObj: ICallTxObj | ITransactionObj
        ) => {
          const isConstant = contractMethod.constant;
          const isParamless = contractMethod.paramless;
          const mergedTxObj = isParamless
            ? { ...defaultTxObj, ...userArgs }
            : { ...defaultTxObj, ...txObj };
          const methodArgs: any = { //TODO fix issue between ICallTxObj and methodArgs
            func: contractMethod,
            node,
            txObj: mergedTxObj,
            userArgs: isParamless ? null : userArgs
          };
          return isConstant ? handleCall(methodArgs) : handleSend(methodArgs);
        };
        case(AbiMethodTypes.constructor):
          return (
            userArgs: any[],
            txObj: ITransactionObj
          ) => {
            const isParamless = contractMethod.paramless
            const mergedTxObj = isParamless
            ? { ...defaultTxObj, ...userArgs }
            : { ...defaultTxObj, ...txObj }
            const methodArgs: any = {
              constructor: contractMethod,
              node,
              txObj: mergedTxObj,
              userArgs: isParamless ? null : userArgs
            }
            return handleInit(methodArgs);
          }
      }
    }
  };
  return new Proxy(contract, routeCalls) as T;
};

export { ProxiedNode, CreateContract, ConnectedContract };