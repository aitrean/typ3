import BN from 'bn.js'

export interface IComplexContract{
overloadedFunction: ABIFuncSend<{arg0: BN | Buffer | string,arg1: BN | Buffer | string}> | ABIFuncCall<{arg0: BN | Buffer | string},{0: BN | Buffer | string}>
a: ABIFuncParamlessCall<{0: BN | Buffer | string}>
callFunction1: ABIFuncCall<{arg0: BN | Buffer | string,arg1: string | Buffer},{output0: BN | Buffer | string,output1: string | Buffer}>
sendFunction1: ABIFuncSend<{arg0: BN | Buffer | string,arg1: BN | Buffer | string}>
b: ABIFuncParamlessCall<{0: string | Buffer}>
sendFunction0: ABIFuncSend<{arg0: BN | Buffer | string}>
callFunction0: ABIFuncCall<{arg0: BN | Buffer | string},{output0: BN | Buffer | string}>
d: ABIFuncParamlessCall<{0: BN | Buffer | string}>
c: ABIFuncParamlessCall<{0: BN | Buffer | string}>
callFunctionDynamicUint: ABIFuncParamlessCall<{0: BN | Buffer | string}>
callFunctionDynamicBytes: ABIFuncParamlessCall<{0: string | Buffer}>
}
export interface IComplexContractConnected {
address: string
overloadedFunction: ABIFuncSendConnected<{arg0: BN | Buffer | string,arg1: BN | Buffer | string}> | ABIFuncCallConnected<{arg0: BN | Buffer | string},{0: BN | Buffer | string}>
a: ABIFuncParamlessCallConnected<{0: BN | Buffer | string}>;
callFunction1: ABIFuncCallConnected<{arg0: BN | Buffer | string,arg1: string | Buffer},{output0: BN | Buffer | string,output1: string | Buffer}>;
sendFunction1: ABIFuncSendConnected<{arg0: BN | Buffer | string,arg1: BN | Buffer | string}>;
b: ABIFuncParamlessCallConnected<{0: string | Buffer}>;
sendFunction0: ABIFuncSendConnected<{arg0: BN | Buffer | string}>;
callFunction0: ABIFuncCallConnected<{arg0: BN | Buffer | string},{output0: BN | Buffer | string}>;
d: ABIFuncParamlessCallConnected<{0: BN | Buffer | string}>;
c: ABIFuncParamlessCallConnected<{0: BN | Buffer | string}>;
callFunctionDynamicUint: ABIFuncParamlessCallConnected<{0: BN | Buffer | string}>;
callFunctionDynamicBytes: ABIFuncParamlessCallConnected<{0: string | Buffer}>;
}
export type IComplexContractConstructor = ABIFuncParamlessSendConnected


export interface ISimpleContract{
succeeded: ABIFuncParamlessCall<{0: boolean}>
}
export interface ISimpleContractConnected {
address: string
succeeded: ABIFuncParamlessCallConnected<{0: boolean}>;
}
export type ISimpleContractConstructor = ABIFuncParamlessSendConnected



interface ABIFuncParamlessCall<T = void> {
  encodeArguments(): string;
  decodeArguments(str: string): any;
  decodeReturnValue(argStr: string): T;
}

interface ABIFuncCall<T, K = void> {
  encodeArguments(x: T): string;
  decodeArguments(str: string): T;
  decodeReturnValue(argStr: string): K;
}

interface ABIFuncParamlessSend {
  encodeArguments(): string;
  decodeArguments(str: string): any;
}

interface ABIFuncSend<T> {
  encodeArguments(x: T): string;
  decodeArguments(str: string): T;
}
type ABIFuncCallConnected<T, K = void> = (x: T, txObj?: ICallTxObj) => Promise<K>;
type ABIFuncParamlessCallConnected<T = void> = (txObj?: ICallTxObj) => Promise<T>;
type ABIFuncSendConnected<T> = (x: T, txObj?: ITransactionObject) => Promise<string>;
type ABIFuncParamlessSendConnected = (txObj?: ITransactionObject) => Promise<string>;

interface ITransactionObject {
  from?: string;
  to?: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
  data?: string;
  nonce?: string;
}

interface ICallTxObj {
  from?: string;
  to?: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
  data?: string;
}

