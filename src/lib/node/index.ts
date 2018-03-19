import { IProxiedNode } from './typings';
import { NodeFactory } from './node';
import { rerouteRPCMethodsHandler } from './rpc/rpcMethods';

export * from './typings'

export const ProxiedNode = (endpoint: string): IProxiedNode => {
  const node = NodeFactory(endpoint);
  return rerouteRPCMethodsHandler(node);
};
