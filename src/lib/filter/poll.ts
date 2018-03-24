import { IProxiedNode } from '../node';
import delay from 'timeout-as-promise';

export const pollFilter = async (node: IProxiedNode, args?: any, parser?: Function, errorHandler?: Function) => {
	await delay(1000)
	const response = await node.eth_getFilterChanges(args, parser, errorHandler)
	return response;
}