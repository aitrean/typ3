import { checkForContractAddress } from './../index';
import { IHandleCallParams, IHandleSendParams, IHandleInitParams } from '../typings'

export const handleCall = async (args: IHandleCallParams) => {
  const { userArgs, func, node, txObj } = args;
  const data = func.encodeArguments(userArgs);
  const response = await node.eth_call({ data, ...txObj }); //TODO add rejection handling
  const parsedResponse = func.decodeReturnValue(response);
  return parsedResponse;
};

export const handleSend = async (args: IHandleSendParams) => {
  const { userArgs, func, node, txObj } = args;
  const data = func.encodeArguments(userArgs);
  const response = await node.eth_sendTransaction({ data, ...txObj });
  const parsedResponse = func.decodeReturnValue(response);
  return parsedResponse;
};

export const handleInit = async (args: IHandleInitParams) => {
  const { node, txObj, constructorFunction, parameters } = args;
  const { data } = txObj
  const contractData = constructorFunction ? constructorFunction.encodeArguments(parameters, data) : data
  const response = await node.eth_sendTransaction({ data: contractData, ...txObj });
  const address = await checkForContractAddress(node, response)
  return address;
}
