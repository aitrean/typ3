import BN from 'bn.js'

export interface IComplexContract{
overloadedFunction: ABIFuncSend<{arg0: BN | Buffer,arg1: BN | Buffer}> | ABIFuncCall<{arg0: BN | Buffer},{0: BN | Buffer}>
a: ABIFuncParamlessCall<{0: BN | Buffer}> | ABIFuncParamlessCall<{0: string | Buffer}>
callFunction1: ABIFuncCall<{arg0: BN | Buffer,arg1: string | Buffer},{output0: BN | Buffer,output1: string | Buffer}>
sendFunction1: ABIFuncSend<{arg0: BN | Buffer,arg1: BN | Buffer}>
b: ABIFuncParamlessCall<{0: string | Buffer}>
sendFunction0: ABIFuncSend<{arg0: BN | Buffer}>
callFunction0: ABIFuncCall<{arg0: BN | Buffer},{output0: BN | Buffer}>
d: ABIFuncParamlessCall<{0: BN | Buffer}>
c: ABIFuncParamlessCall<{0: BN | Buffer}>
}
export interface IComplexContractConnected {
address: string
overloadedFunction: ABIFuncSendConnected<{arg0: BN | Buffer,arg1: BN | Buffer}> | ABIFuncCallConnected<{arg0: BN | Buffer},{0: BN | Buffer}>
a: ABIFuncParamlessCallConnected<{0: BN | Buffer}>;
callFunction1: ABIFuncCallConnected<{arg0: BN | Buffer,arg1: string | Buffer},{output0: BN | Buffer,output1: string | Buffer}>;
sendFunction1: ABIFuncSendConnected<{arg0: BN | Buffer,arg1: BN | Buffer}>;
b: ABIFuncParamlessCallConnected<{0: string | Buffer}>;
sendFunction0: ABIFuncSendConnected<{arg0: BN | Buffer}>;
callFunction0: ABIFuncCallConnected<{arg0: BN | Buffer},{output0: BN | Buffer}>;
d: ABIFuncParamlessCallConnected<{0: BN | Buffer}>;
c: ABIFuncParamlessCallConnected<{0: BN | Buffer}>;
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

