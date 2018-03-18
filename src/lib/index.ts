import { ConstructorFactory } from './abi/function/index';
import { Filter, pollFilter } from './utils/filter';
import { AbiMethodTypes, Selector } from './abi/contract/index';
import { CreateContract } from './abi';
import { ProxiedNode, IProxiedNode } from './node';
import { IFunctionFactory, IConstructorFactory } from './abi/function/typings';

//TODO move these interfaces into a typings folder
interface IContract {
  [behaviour: string]: any
}

interface IHandleCallParams {
  userArgs: any[] | undefined;
  txObj: ITransactionObject
  func: IFunctionFactory;
  node: IProxiedNode;
}

interface IHandleSendParams extends IHandleCallParams {
  txObj: ITransactionObject;
}

interface IHandleInitParams {
  node: IProxiedNode;
  txObj: ITransactionObject;
  constructorFunction?: IConstructorFactory;
  parameters?: object | undefined;
}

interface ConstructorArguments<K> {
  parameters?: string | K | object,
  txObj?: ITransactionObject
}

type AtConstructor = (address: string) => any;

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
  const { node, txObj, constructorFunction, parameters } = args;
  const { data } = txObj
  const contractData = constructorFunction ? constructorFunction.encodeArguments(parameters, data) : data
  const response = await node.eth_sendTransaction({ data: contractData, ...txObj });
  const address = await checkForContractAddress(node, response)
  return address;
}

const checkForContractAddress = async (node: IProxiedNode, txHash: string, timeout?: number) => {
  const count = timeout ? timeout : 50
  for(var i = 0; i < count; i++){
    const response = await pollFilter(node);
    if(response){
      const result = await node.eth_getTransactionReceipt(txHash)
      if(result.contractAddress){
        return result.contractAddress;
      }
    }
  }
  throw Error(`could not find the transaction receipt after ${count} blocks`)
}

export const ContractInstance = async <T, K = {}>(contract: IContract, node: IProxiedNode, args: ConstructorArguments<K>) => {
  const { parameters, txObj } = args
  if(typeof parameters === 'string'){
    const response = await node.eth_getCode(parameters);
    if(response === '0x'){
      throw Error('could not find address instantiated at given address')
    }
    return ConnectedContract<T>(contract, node, parameters)
  } else if(txObj && txObj.data) {
    if(contract['new']){
      const constructorFunction = contract['new']
      const address = await handleInit({parameters, constructorFunction, node, txObj})
      return ConnectedContract<T>(contract, node, address)
    } else {
      const address = await handleInit({node, txObj})
      return ConnectedContract<T>(contract, node, address)
    }
  } else {
    throw Error('could not instantiate a contract from those arguments, either pass a compiled contract through the data of the txObject, or the address of a deployed contract')
  }
}

const ConnectedContract = <T>(
  contract: IContract,
  node: IProxiedNode,
  address: string,
  defaultTxObj: Partial<ITransactionObject> = {
    to: address
  }
) => {
  const routeCalls = {
    get(contract: IContract, propKey: any) {
      if(propKey === 'address'){
        return address
      }
      if (!Object.getOwnPropertyNames(contract).includes(propKey)) {
        return contract[propKey];
      }
      const contractMethod: IFunctionFactory = contract[propKey];
      if (!contractMethod) {
        throw Error(`${propKey} is not a valid contract method`);
      }
      if (contractMethod.type.toString() === AbiMethodTypes.constructor){
        throw Error('cannot directly invoke constructor or fallback on a deployed instance')
      }
      return (
        userArgs: any[],
        txObj: ITransactionObject
      ) => {
          const isConstant = contractMethod.constant;
          const isParamless = contractMethod.paramless;
          const mergedTxObj = isParamless
          ? { ...defaultTxObj, ...userArgs }
          : { ...defaultTxObj, ...txObj }
          const methodArgs: any = { //TODO fix issue between ICallTxObj and methodArgs
            func: contractMethod,
            node,
            txObj: mergedTxObj,
            userArgs: isParamless ? null : userArgs
          };
          return isConstant ? handleCall(methodArgs) : handleSend(methodArgs);
      };
    }
  };
  return new Proxy(contract, routeCalls) as T;
};

export { ProxiedNode, CreateContract, ConnectedContract };