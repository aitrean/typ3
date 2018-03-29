import { checkForContractAddress } from './../index';
import { IHandleCallParams, IHandleSendParams, IHandleInitParams } from 'lib/contract/typings'

export const handleCall = async (args: IHandleCallParams) => {
  const { userArgs, func, node, txObj } = args;
  const data = func.encodeArguments(userArgs);
  const response = await node.eth_call({ ...txObj, data });
  const parsedResponse = func.decodeReturnValue(response);
  return parsedResponse;
};

export const handleSend = async (args: IHandleSendParams) => {
  const { userArgs, func, node, txObj } = args;
  const data = func.encodeArguments(userArgs);
  const response = await node.eth_sendTransaction({ ...txObj, data });
  return response;
};

export const handleInit = async (args: IHandleInitParams) => {
  const { node, txObj, constructorFunction, parameters } = args;
  const { data } = txObj
  const contractData = constructorFunction ? constructorFunction.encodeArguments(parameters, data) : data
  const modTxObj = { ...txObj, data: contractData }
  const response = await node.eth_sendTransaction({ ...txObj, data: contractData });
  const address = await checkForContractAddress(node, response)
  return address;
}
