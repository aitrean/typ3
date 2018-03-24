import { IProxiedNode } from '../node';
import delay from 'timeout-as-promise';

export const pollFilter = async (node: IProxiedNode, args?: any, parser?: (result: any) => any, errorHandler?: (err: any) => any) => {
	await delay(1000)
	const response = await node.eth_getFilterChanges(args, parser, errorHandler)
	return response;
}