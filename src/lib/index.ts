import { CreateContract } from './abi';
import { ProxiedNode, IProxiedNode } from './node';

interface IHandleCallParams {
  userArgs: any[] | null;
  txObj: ICallTxObj;
  func: IFunctionFactory;
  node: IProxiedNode;
}

interface IHandleSendParams {
  userArgs: any[] | null;
  txObj: ITransactionObj;
  node: IProxiedNode;
  func: IFunctionFactory;
  contract?: string;
}

const handleCall = async (args: IHandleCallParams) => {
  const { userArgs, func, node, txObj } = args;
  const data = func.encodeArguments(userArgs);
  const response = await node.eth_call({ data, ...txObj }); //TODO add rejection handling
  const parsedResponse = func.decodeReturnValue(response);
  return parsedResponse;
};

const handleSend = async (args: IHandleSendParams) => {
  const { userArgs, func, node, txObj, contract } = args;
  if(contract){
    const contractData = await node.eth_compileSolidity(contract)
    const response = await node.eth_sendTransaction({ data: contractData, ...txObj });
    return response;
  } 
  if(func){
    const data = func.encodeArguments(userArgs);
    const response = await node.eth_sendTransaction({ data, ...txObj });
    const parsedResponse = func.decodeReturnValue(response);
    return parsedResponse;
  }
  throw Error('could not find a function or constructor on the send parameters')
};

const ConnectedContract = <T>(
  contract: any,
  node: IProxiedNode,
  defaultTxObj: Partial<ITransactionObj> = {}
) => {
  const routeCalls = {
    get(contract: any, propKey: any) {
      if (!Object.getOwnPropertyNames(contract).includes(propKey)) {
        return contract[propKey];
      }
      const contractMethod: IFunctionFactory = contract[propKey];
      const isConstant = contractMethod.constant;
      const isParamless = contractMethod.paramless;
      const isConstructor = propKey === 'new'
      if (!contractMethod) {
        throw Error(`${propKey} is not a valid contract method`);
      }

      const returnFunc = (
        userArgs: any[],
        txObj: ICallTxObj | ITransactionObj
      ) => {
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

      return returnFunc;
    }
  };
  return new Proxy(contract, routeCalls) as T;
};

export { ProxiedNode, CreateContract, ConnectedContract };
