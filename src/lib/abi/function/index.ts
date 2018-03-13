import { AbiMethodTypes } from './../contract/index';
import * as abi from 'ethereumjs-abi';
import {
  makeArgHandlers,
  decodeArguments,
  decodeReturnValue,
  encodeArguments,
  encodeConstructor
} from './components/coders';
import { IAbiFunction, IFuncOutputMappings, IFunctionFactory, IAugmentedAbiFunction, IAugmentedAbiConstructor, IConstructorFactory, IAbiConstructor } from './typings';

export const FunctionFactory = (
  abiFunc: IAbiFunction,
  outputMappings: IFuncOutputMappings = []
): IFunctionFactory => {
  const { inputs, name, outputs } = abiFunc;
  const argHandlers = makeArgHandlers(inputs);
  const inputTypes = inputs.map(({ type }) => type);
  const outputTypes = outputs.map(({ type }) => type);
  const inputNames = inputs.map(({ name }) => name);
  const outputNames: string[] = outputs.map(
    ({ name }, i) => name || outputMappings[i] || `${i}`
  );
  const methodSelector = abi.methodID(name, inputTypes).toString('hex');

  const augmentedFunc: IAugmentedAbiFunction = {
    abi: abiFunc,
    argHandlers,
    derived: {
      inputNames,
      inputTypes,
      outputNames,
      outputTypes
    },
    methodSelector
  };

  return {
    type: AbiMethodTypes.function,
    constant: augmentedFunc.abi.constant,
    paramless: augmentedFunc.abi.inputs.length === 0,
    decodeArguments: args => decodeArguments(args, augmentedFunc),
    decodeReturnValue: ret => decodeReturnValue(ret, augmentedFunc),
    encodeArguments: args => encodeArguments(args, augmentedFunc)
  };
};

export const ConstructorFactory = (
  abiConstructor: IAbiConstructor
): IConstructorFactory => {
  const { inputs } = abiConstructor;
  const argHandlers = makeArgHandlers(inputs);
  const inputNames = inputs.map(({ name }) => name)
  const inputTypes = inputs.map(({ type }) => type)
  const augmentedConstructor: IAugmentedAbiConstructor = {
    abi: abiConstructor,
    argHandlers,
    derived: {
      inputNames,
      inputTypes
    }
  }
  return {
    type: AbiMethodTypes.constructor,
    paramless: augmentedConstructor.abi.inputs.length === 0,
    encodeArguments: (args, byteCode) => encodeConstructor(args, byteCode, augmentedConstructor)
  }
}
