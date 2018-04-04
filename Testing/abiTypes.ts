import BN from 'bn.js'

export interface IComplexContract{
overloadedFunction: ABIFuncSend<{arg0: uint,arg1: uint}> | ABIFuncCall<{arg0: uint},{0: uint}>
a: ABIFuncParamlessCall<{0: uint}>
callFunction1: ABIFuncCall<{arg0: uint,arg1: bytes},{output0: uint,output1: bytes}>
sendFunction1: ABIFuncSend<{arg0: int,arg1: int}>
b: ABIFuncParamlessCall<{0: bytes}>
sendFunction0: ABIFuncSend<{arg0: uint}>
callFunction0: ABIFuncCall<{arg0: uint},{output0: uint}>
d: ABIFuncParamlessCall<{0: uint}>
c: ABIFuncParamlessCall<{0: int}>
callFunctionDynamicUint: ABIFuncParamlessCall<{0: uint}>
callFunctionDynamicBytes: ABIFuncParamlessCall<{0: bytes}>
}
export interface IComplexContractConnected {
address: string
overloadedFunction: ABIFuncSendConnected<{arg0: uint,arg1: uint}> | ABIFuncCallConnected<{arg0: uint},{0: uint}>
a: ABIFuncParamlessCallConnected<{0: uint}>;
callFunction1: ABIFuncCallConnected<{arg0: uint,arg1: bytes},{output0: uint,output1: bytes}>;
sendFunction1: ABIFuncSendConnected<{arg0: int,arg1: int}>;
b: ABIFuncParamlessCallConnected<{0: bytes}>;
sendFunction0: ABIFuncSendConnected<{arg0: uint}>;
callFunction0: ABIFuncCallConnected<{arg0: uint},{output0: uint}>;
d: ABIFuncParamlessCallConnected<{0: uint}>;
c: ABIFuncParamlessCallConnected<{0: int}>;
callFunctionDynamicUint: ABIFuncParamlessCallConnected<{0: uint}>;
callFunctionDynamicBytes: ABIFuncParamlessCallConnected<{0: bytes}>;
}
export interface IComplexContractConstructor {
arg0: uint,arg1: bytes
}


export interface ISimpleContract{
succeeded: ABIFuncParamlessCall<{0: boolean}>
}
export interface ISimpleContractConnected {
address: string
succeeded: ABIFuncParamlessCallConnected<{0: boolean}>;
}

type int = string | BN
type uint = string | BN
type address = string
type bytes = string | Buffer

type ABIFuncCallConnected<T, K = void> = (x: T, txObj?: ICallTxObj) => Promise<K>;
type ABIFuncParamlessCallConnected<T = void> = (txObj?: ICallTxObj) => Promise<T>;
type ABIFuncSendConnected<T> = (x: T, txObj?: ITransactionObject) => Promise<string>;
type ABIFuncParamlessSendConnected = (txObj?: ITransactionObject) => Promise<string>;

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

