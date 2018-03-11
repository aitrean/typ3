import { AbiMethodTypes } from './../contract/index';
import { IProxiedNode } from './../../node/index';
type IO = { name: string; type: string };

interface IFunctionFactory {
  type: AbiMethodTypes.function;
  constant: boolean;
  paramless: boolean;
  decodeArguments: (args: string) => IDecode;
  decodeReturnValue: (ret: string) => IDecode;
  encodeArguments: (args: any) => string;
}

interface IConstructorFactory {
  type: AbiMethodTypes.constructor
  paramless: boolean;
  encodeArguments: (args: any) => string;
}

interface IEventFactory {
  type: 'event'
}

interface IAbiFunction {
  type: AbiMethodTypes.function;
  name: string;
  inputs: IO[];
  outputs: IO[];
  constant: boolean;
  payable: boolean;
}

interface IAbiConstructor {
  type: AbiMethodTypes.constructor
  name: "new"
  inputs: IO[]
  payable: boolean
}

interface IAbiEvent {
  name: string
  type: AbiMethodTypes.event
}

interface IAugmentedAbiFunction {
  abi: IAbiFunction;
  derived: {
    inputTypes: string[];
    outputTypes: string[];
    inputNames: string[];
    outputNames: string[];
  };
  methodSelector: string;
  argHandlers: IFuncArgs;
}

interface IAugmentedConstructor {
  abi: IAbiConstructor
  derived: {
    inputTypes: string[],
    inputNames: string[]
  }
  argHandlers: IFuncArgs;
}

type IFactory = IConstructorFactory | IFunctionFactory | IEventFactory
type IAbiBehaviour = IAbiConstructor | IAbiFunction
type IFuncOutputMappings = string[];

interface IFuncArgs {
  [name: string]: {
    processInput: (inputToParse: any) => any;
    name: IAbiFunction['name'];
    type: IAbiFunction['type'];
  };
}

interface IArgs {
  [name: string]: any;
}

interface IDecode {
  [key: string]: any;
}

interface IUserSuppliedArgs {
  [argumentName: string]: any;
}
