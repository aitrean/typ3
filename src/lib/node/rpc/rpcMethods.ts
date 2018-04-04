import { makeArgHandlers } from './../../contract/function/components/coders';
import { ITransactionObject, IEstimateGasObj, IBlockNumber, IFilterOptions, IRPCRequestObj, IAugmentedNode } from './../typings';
import { generateTxObj, JSONPostProcessor, JSONErrorHandler } from './jsonUtils';
import { IProxiedNode } from '../typings'

//TODO review these param signatures
/* tslint:disable */
const eth_sendRawTransaction = (tx: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_sendRawTransaction,
  params: [tx, 'pending'],
  parser,
  error
});

const eth_call = (call: ITransactionObject, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_call,
  params: [call, 'pending'],
  parser,
  error
});

const eth_sendTransaction = (tx: ITransactionObject, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_sendTransaction,
  params: [tx],
  parser,
  error
});

const eth_accounts = (parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_accounts,
  params: [],
  parser,
  error
});

const eth_blockNumber = (parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_blockNumber,
  params: [],
  parser,
  error
});

const eth_coinbase = (parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_coinbase,
  params: [],
  parser,
  error
});

const eth_estimateGas = (tx: IEstimateGasObj, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_estimateGas,
  params: [tx, 'pending'],
  parser,
  error
});

const eth_gasPrice = (parser?: (value: any) => any, error?: (value: any) => any) => ({ method: eth_gasPrice, parser, error });

const eth_getBalance = (address: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getBalance,
  params: [address, 'pending'],
  parser,
  error
});

const eth_getBlockByHash = (hash: string, fullTxObj: boolean, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getBlockByHash,
  params: [hash, fullTxObj],
  parser,
  error
});

const eth_getBlockByNumber = (
  blocknumber: IBlockNumber,
  fullTxObj: boolean,
  parser?: (value: any) => any, 
  error?: (value: any) => any
) => ({
  method: JsonRpcMethods.eth_getBlockByNumber,
  params: [blocknumber, fullTxObj],
  parser, error
});

const eth_getBlockTransactionCountByHash = (hash: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getBlockTransactionCountByHash,
  params: [hash],
  parser,
  error
});

const eth_getBlockTransactionCountByNumber = (blocknumber: IBlockNumber, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getBlockTransactionCountByNumber,
  params: [blocknumber],
  parser,
  error
});

const eth_getCode = (address: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getCode,
  params: [address, 'latest'],
  parser, 
  error
});

const eth_getFilterChanges = (filterId: string, parser?: any, error?: any) => ({
  method: JsonRpcMethods.eth_getFilterChanges,
  params: [filterId],
  parser,
  error
});

const eth_getFilterLogs = (filterId: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getFilterLogs,
  params: [filterId],
  parser,
  error
});

const eth_getLogs = (filterObj: IFilterOptions, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getLogs,
  params: [filterObj],
  parser,
  error
});

const eth_getStorageAt = (
  address: string,
  positionInStorage: string,
  blockNumber: IBlockNumber,
  parser?: (value: any) => any, 
  error?: (value: any) => any
) => ({
  method: JsonRpcMethods.eth_getStorageAt,
  params: [address, positionInStorage, blockNumber],
  parser,
  error
});

const eth_getTransactionByBlockHashAndIndex = (
  hash: string,
  transactionIdx: string, 
  parser?: (value: any) => any, 
  error?: (value: any) => any
) => ({
  method: JsonRpcMethods.eth_getTransactionByBlockHashAndIndex,
  params: [hash, transactionIdx], 
  parser,
  error
});

const eth_getTransactionByBlockNumberAndIndex = (
  blockNum: IBlockNumber,
  transactionIdx: string, 
  parser?: (value: any) => any, 
  error?: (value: any) => any
) => ({
  method: JsonRpcMethods.eth_getTransactionByBlockNumberAndIndex,
  params: [blockNum, transactionIdx],
  parser,
  error
});

const eth_getTransactionByHash = (hash: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getTransactionByHash,
  params: [hash],
  parser,
  error
});

const eth_getTransactionCount = (address: string, blockNum?: IBlockNumber, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getTransactionCount,
  params: [address, blockNum],
  parser,
  error
});

const eth_getTransactionReceipt = (hash: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getTransactionReceipt,
  params: [hash],
  parser,
  error
});

const eth_getUncleByBlockHashAndIndex = (
  hash: string,
  transactionIdx: string, 
  parser?: (value: any) => any, 
  error?: (value: any) => any
) => ({
  method: JsonRpcMethods.eth_getUncleByBlockHashAndIndex,
  params: [hash, eth_getTransactionCount],
  parser,
  error
});

const eth_getUncleByBlockNumberAndIndex = (
  transactionIdx: string,
  blockNum?: IBlockNumber, 
  parser?: (value: any) => any, 
  error?: (value: any) => any
) => ({
  method: JsonRpcMethods.eth_getUncleByBlockNumberAndIndex,
  params: [blockNum, transactionIdx],
  parser,
  error
});

const eth_getCompilers = (parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getCompilers,
  params: [],
  parser,
  error
});

const eth_compileSolidity = (source: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_compileSolidity,
  params: [source],
  parser,
  error
});

const eth_newFilter = (filterObj: IFilterOptions, parser?: any, error?: any) => ({
  method: JsonRpcMethods.eth_newFilter,
  params: [filterObj],
  parser,
  error
});

const eth_newBlockFilter = (parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_newBlockFilter,
  params: [],
  parser,
  error
});

const eth_newPendingTransactionFilter = (parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_newPendingTransactionFilter,
  params: [],
  parser,
  error
});

const eth_uninstallFilter = (filterId: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_uninstallFilter,
  params: [filterId],
  parser,
  error
});

const eth_getWork = (parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_getWork,
  params: [],
  parser,
  error
});

const eth_submitWork = (
  hashNonceFound: string,
  hashHeadersPow: string,
  hashMixDigest: string,
  parser?: (value: any) => any, 
  error?: (value: any) => any
) => ({
  method: JsonRpcMethods.eth_submitWork,
  params: [hashNonceFound, hashHeadersPow, hashMixDigest],
  parser,
  error
});

const eth_submitHashrate = (hashRate: string, id: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.eth_submitHashrate,
  params: [hashRate, id],
  parser,
  error
});

const db_putString = (dbName: string, keyName: string, store: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.db_putString,
  params: [dbName, keyName, store],
  parser,
  error
});

const db_getString = (dbName: string, keyName: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.db_getString,
  params: [dbName, keyName],
  parser,
  error
});

const db_putHex = (dbName: string, keyName: string, storeData: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.db_putHex,
  params: [dbName, keyName, storeData],
  parser,
  error
});

const db_getHex = (dbName: string, keyName: string, parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.db_getHex,
  params: [dbName, keyName],
  parser,
  error
});

const shh_version = (parser?: (value: any) => any, error?: (value: any) => any) => ({
  method: JsonRpcMethods.shh_version,
  params: [],
  parser,
  error
});
/* tslint:enable */

const rpcMethods: any = {
  eth_call,
  eth_sendRawTransaction,
  eth_sendTransaction,
  eth_accounts,
  eth_blockNumber,
  eth_coinbase,
  eth_estimateGas,
  eth_gasPrice,
  eth_getBalance,
  eth_getBlockByHash,
  eth_getBlockByNumber,
  eth_getBlockTransactionCountByHash,
  eth_getBlockTransactionCountByNumber,
  eth_getCode,
  eth_getFilterChanges,
  eth_getFilterLogs,
  eth_getLogs,
  eth_getStorageAt,
  eth_getTransactionByBlockHashAndIndex,
  eth_getTransactionByBlockNumberAndIndex,
  eth_getTransactionByHash,
  eth_getTransactionCount,
  eth_getTransactionReceipt,
  eth_getUncleByBlockHashAndIndex,
  eth_getUncleByBlockNumberAndIndex,
  eth_getCompilers,
  eth_compileSolidity,
  eth_newFilter,
  eth_newBlockFilter,
  eth_newPendingTransactionFilter,
  eth_uninstallFilter,
  eth_getWork,
  eth_submitWork,
  eth_submitHashrate,
  db_putString,
  db_getString,
  db_putHex,
  db_getHex,
  shh_version,
};

enum JsonRpcMethods {
  web3_clientVersion = 'web3_clientVersion',
  web3_sha3 = 'web3_sha3',
  net_peerCount = 'net_peerCount',
  net_version = 'net_version',
  net_listening = 'net_listening',
  eth_protocolVersion = 'eth_protocolVersion',
  eth_syncing = 'eth_syncing',
  eth_coinbase = 'eth_coinbase',
  eth_mining = 'eth_mining',
  eth_hashrate = 'eth_hashrate',
  eth_gasPrice = 'eth_gasPrice',
  eth_accounts = 'eth_accounts',
  eth_blockNumber = 'eth_blockNumber',
  eth_getBalance = 'eth_getBalance',
  eth_getStorageAt = 'eth_getStorageAt',
  eth_getTransactionCount = 'eth_getTransactionCount',
  eth_getBlockTransactionCountByHash = 'eth_getBlockTransactionCountByHash',
  eth_getBlockTransactionCountByNumber = 'eth_getBlockTransactionCountByNumber',
  eth_getUncleCountByBlockHash = 'eth_getUncleCountByBlockHash',
  eth_getUncleCountByBlockNumber = 'eth_getUncleCountByBlockNumber',
  eth_getCode = 'eth_getCode',
  eth_sign = 'eth_sign',
  eth_sendTransaction = 'eth_sendTransaction',
  eth_sendRawTransaction = 'eth_sendRawTransaction',
  eth_call = 'eth_call',
  eth_estimateGas = 'eth_estimateGas',
  eth_getBlockByHash = 'eth_getBlockByHash',
  eth_getBlockByNumber = 'eth_getBlockByNumber',
  eth_getTransactionByHash = 'eth_getTransactionByHash',
  eth_getTransactionByBlockHashAndIndex = 'eth_getTransactionByBlockHashAndIndex',
  eth_getTransactionByBlockNumberAndIndex = 'eth_getTransactionByBlockNumberAndIndex',
  eth_getTransactionReceipt = 'eth_getTransactionReceipt',
  eth_getUncleByBlockHashAndIndex = 'eth_getUncleByBlockHashAndIndex',
  eth_getUncleByBlockNumberAndIndex = 'eth_getUncleByBlockNumberAndIndex',
  eth_getCompilers = 'eth_getCompilers',
  eth_compileLLL = 'eth_compileLLL',
  eth_compileSolidity = 'eth_compileSolidity',
  eth_compileSerpent = 'eth_compileSerpent',
  eth_newFilter = 'eth_newFilter',
  eth_newBlockFilter = 'eth_newBlockFilter',
  eth_newPendingTransactionFilter = 'eth_newPendingTransactionFilter',
  eth_uninstallFilter = 'eth_uninstallFilter',
  eth_getFilterChanges = 'eth_getFilterChanges',
  eth_getFilterLogs = 'eth_getFilterLogs',
  eth_getLogs = 'eth_getLogs',
  eth_getWork = 'eth_getWork',
  eth_submitWork = 'eth_submitWork',
  eth_submitHashrate = 'eth_submitHashrate',
  db_putString = 'db_putString',
  db_getString = 'db_getString',
  db_putHex = 'db_putHex',
  db_getHex = 'db_getHex',
  shh_post = 'shh_post',
  shh_version = 'shh_version',
  shh_newIdentity = 'shh_newIdentity',
  shh_hasIdentity = 'shh_hasIdentity',
  shh_newGroup = 'shh_newGroup',
  shh_addToGroup = 'shh_addToGroup',
  shh_newFilter = 'shh_newFilter',
  shh_uninstallFilter = 'shh_uninstallFilter',
  shh_getFilterChanges = 'shh_getFilterChanges',
  shh_getMessages = 'shh_getMessages'
}

export const rerouteRPCMethodsHandler = (obj: IAugmentedNode) => {
  const rerouteRPC = {
    get(node: IAugmentedNode, propKey: string) {
      const rpcMethod = rpcMethods[propKey];
      const nodeMethod = node[propKey];
      if (!rpcMethod && !nodeMethod) {
        throw Error(`${propKey} is not an RPC or Node method`);
      }
      if (nodeMethod) {
        const result = (...args: any[]) => nodeMethod(...args);
        return result;
      } else {
        return (...args: any[]) => {
          const call = rpcMethod(...args);
          const rpcObj: IRPCRequestObj = {
            txObj: generateTxObj(call) as any,
            postprocessor: JSONPostProcessor(call.parser),
            errorHandler: JSONErrorHandler(call.errorHandler)
          };
          return node.sendRpcRequest(rpcObj);
        };
      }
    }
  };
  return new Proxy(obj, rerouteRPC) as IProxiedNode;
};
