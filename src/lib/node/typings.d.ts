//TODO clean up all of these typings
interface INode {
  endpoint: string;
}

type SendRpcRequest = (request: IRPCRequestObj) => Promise<any>;
type SetEndpoint = (endpoint: string) => void;
type IEstimateGasObj = Partial<ITransactionObject>;
type address = string;
type INewBlockFilterLog = string[];
type INewPendingTransactionFilterLog = string[];
type ITopic = string | null | (string | null)[];
type IBlockNumber = string | 'earliest' | 'latest' | 'pending';

interface IFilterOptions {
  fromBlock?: IBlockNumber;
  toBlock?: IBlockNumber;
  address?: string;
  topics?: ITopic[];
}
interface IAugmentedNode {
  [key: string]: any //TODO add real typings
  sendRpcRequest: (request: IRPCRequestObj) => Promise<any>;
  setEndpoint: (endpoint: string) => void;
}
interface INodeOutput {
  result: any[] | any;
}

interface IMethodAndParams {
  method: String;
  params: String[] | String;
}

interface IRequest {
  method: String;
  params: any | any[];
  id: String;
  jsonrpc: String;
}

interface IResponse {
  id: number,
  jsonrpc: string,
  result: any
}

interface IStringifiedResponse extends IResponse {
  result: string
}

interface IStringifiedResponseList extends IResponse {
  result: string[]
}

interface IBlockResponse extends IResponse {
  result: IBlockObj
}

interface IBooleanResponse extends IResponse {
  result: boolean
}

type IFilter = INewBlockFilterLog | INewPendingTransactionFilterLog | IEthNewFilterLogPending[] | IEthNewFilterLog[]

interface IRPCRequestObj {
  txObj: IRequest;
  postprocessor?: any;
  errorHandler?: any;
}

interface IInputMappings {
  endpoint: String;
  method: String;
  params: any | any[];
  address: String;
}

interface ITransactionObject {
  from: string,
  to?: string,
  nonce?: string,
  value?: string,
  gas?: string,
  gasPrice?: string
  data?: string
  input?: string,
  hash?: string,
  blockHash?: string,
  blockNumber?: string,
  transactionIndex?:  string,
}
interface ITransactionResponse extends IResponse {
  result: ITransactionObject
}

interface ITransactionOrNullResponse extends IResponse { //TODO swap out some of the ITransactionResponses with this where appropriate
  result: ITransactionObject | null
}

interface ITransactionReceiptResponse extends IResponse {
  result: ITransactionReceipt
}

interface IBlockObj {
  number: string;
  hash: string;
  parentHash: string;
  nonce: string | null;
  sha3Uncles: string;
  logsBloom: string | null;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: address;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  transactions: ITransactionObject[] | string[];
  uncles: string[];
}

interface IEthNewFilterLog {
  removed: boolean;
  logIndex: string;
  transactionIndex: string;
  transactionHash: string;
  blockHash: string;
  blockNumber: string;
  address: string;
  data: string | string[];
  topics: string[];
}
interface IEthNewFilterLogPending {
  removed: boolean;
  logIndex: string;
  transactionIndex: string | null;
  transactionHash: string | null;
  blockHash: string | null;
  blockNumber: string | null;
  address: string;
  data: string | string[];
  topics: string[];
}
interface ITransactionReceipt {
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  blockNumber: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  contractAddress: string | null;
  logs: IEthNewFilterLog[];
}

interface IProxiedRpcMethods {
  eth_accounts: () => Promise<string[]>;
  eth_blockNumber: () => Promise<string>;
  eth_call: (tx: ITransactionObject) => Promise<string>;
  eth_coinbase: () => Promise<string>;
  eth_estimateGas: (tx: IEstimateGasObj) => Promise<string>;
  eth_gasPrice: () => Promise<string>;
  eth_getBalance: (address: string) => Promise<string>;
  eth_getCode: (address: string) => Promise<string>;
  eth_getTransactionByHash: (hash: string) => Promise<ITransactionObject>;
  eth_sendRawTransaction: (tx: string) => Promise<string>;
  eth_sendTransaction: (tx: ITransactionObject) => Promise<string>; //TODO check what the nodes are sending back?
  eth_getBlockTransactionCountByHash: (hash: string) => Promise<string>;
  eth_getTransactionReceipt: (hash: string) => Promise<ITransactionReceipt>;
  eth_getCompilers: () => Promise<string[]>;
  eth_compileSolidity: (source: string) => Promise<any>; //TODO add typing for compiled objects
  eth_compileLLL: (source: string) => Promise<string>;
  eth_compileSerpent: (source: string) => Promise<string>;
  eth_newFilter: (filterObj: IFilterOptions) => Promise<string>;
  eth_newBlockFilter: () => Promise<string>;
  eth_newPendingTransactionFilter: () => Promise<string>;
  eth_uninstallFilter: (filterId: string) => Promise<boolean>;
  eth_getWork: () => Promise<string[]>;
  db_getHex: (dbName: string, keyName: string) => Promise<string>;
  shh_version: () => Promise<string>;
  shh_hasIdentity: (address: string) => Promise<boolean>;
  shh_newGroup: () => Promise<string>;
  shh_addToGroup: (address: string) => Promise<boolean>;
  shh_uninstallFilter: (filterId: string) => Promise<boolean>;
  shh_getFilterChanges: (filterId: string) => Promise<any>; //TODO add interface for whisper filters
  shh_getMessages: (filterId: string) => Promise<any>;
  db_getString: (dbName: string, keyName: string) => Promise<string>;
  eth_submitHashrate: (hashRate: string, id: string) => Promise<boolean>;
  eth_getBlockByHash: (
    hash: string,
    fullTxObj: boolean
  ) => Promise<IBlockObj>;
  eth_getBlockTransactionCountByNumber: (
    blocknumber: IBlockNumber
  ) => Promise<string>;
  eth_getBlockByNumber: (
    blocknumber: IBlockNumber,
    fullTxObj: boolean
  ) => Promise<IBlockObj>;
  eth_getTransactionByBlockHashAndIndex: (
    hash: string,
    transactionIdx: string
  ) => Promise<ITransactionObject>;
  eth_getTransactionByBlockNumberAndIndex: (
    blockNum: IBlockNumber,
    transactionIdx: string
  ) => Promise<ITransactionObject>;
  eth_getFilterChanges: (
    filterId: string,
    parser?: any,
    error?: any
  ) => Promise<IFilter>;
  eth_getFilterLogs: (
    filterId: string
  ) => Promise<IFilter>;
  eth_getLogs: (
    filterObj: IFilterOptions
  ) => Promise<IFilter>;
  eth_getStorageAt: (
    address: string,
    positionInStorage: string,
    blockNumber: IBlockNumber
  ) => Promise<string>;

  eth_getTransactionCount: (
    address: string,
    blockNum?: IBlockNumber
  ) => Promise<string>;
  eth_getUncleByBlockHashAndIndex: (
    hash: string,
    transactionIdx: string
  ) => Promise<IBlockObj>;
  eth_getUncleByBlockNumberAndIndex: (
    blockNum: IBlockNumber,
    transactionIdx: string
  ) => Promise<IBlockObj | null>;
  eth_submitWork: (
    hashNonceFound: string,
    hashHeadersPow: string,
    hashMixDigest: string
  ) => Promise<boolean>;
  db_putString: (
    dbName: string,
    keyName: string,
    store: string
  ) => Promise<boolean>;
  db_putHex: (
    dbName: string,
    keyName: string,
    storeData: string
  ) => Promise<boolean>;
}
