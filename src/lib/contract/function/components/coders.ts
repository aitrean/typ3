import { IAugmentedAbiEvent, ITopics } from './../../typings';
import * as abi from 'ethereumjs-abi';
import {
  parsePostDecodedValue,
  parsePreEncodedValue,
  parseSuppliedArgs
} from './parsers';
import { objReduce } from './utils';
import { IAugmentedAbiFunction, IDecode, IAbiFunction, IFuncArgs, IArgs, IAugmentedAbiConstructor, ArgumentsObject } from 'lib/contract/typings';

export const makeArgHandlers = (inputs: IAbiFunction['inputs']): IFuncArgs => {
  const reducer = (accumulator: IFuncArgs, currInput: IAbiFunction) => {
    const { name, type } = currInput;

    const processInput = (inputToParse: IAbiFunction) => ({
      value: parsePreEncodedValue(type, inputToParse)
    });
    const paramaterHandler = { processInput, name, type };
    return {
      ...accumulator,
      [name]: paramaterHandler
    };
  };

  return objReduce(inputs, reducer);
};

export const encodeArguments = (
  suppliedInputs: IArgs = {},
  func: IAugmentedAbiFunction
) => {
  const { derived: { inputTypes }, methodSelector } = func;
  const args = parseSuppliedArgs(suppliedInputs, func);
  const encodedArgs = abi.rawEncode(inputTypes, args).toString('hex');
  return `0x${methodSelector}${encodedArgs}`;
};

export const encodeConstructor = (
  suppliedInputs: IArgs = {},
  byteCode: string | undefined,
  constructor: IAugmentedAbiConstructor
) => {
  if(byteCode){
    const { derived: { inputTypes } } = constructor
    const args = parseSuppliedArgs(suppliedInputs, constructor)
    const encodedArgs = abi.rawEncode(inputTypes, args).toString('hex')
    return `0x${byteCode}${encodedArgs}`
  }
  throw Error('could not find bytecode in the transaction object')
}

export const decodeArguments = (
  argString: string,
  func: IAugmentedAbiFunction | IAugmentedAbiEvent
): IDecode => {
  const { methodSelector, derived: { outputNames, outputTypes } } = func;
  // Remove method selector from data, if present
  argString = argString.replace(`0x${methodSelector}`, '');
  // Convert argdata to a hex buffer for ethereumjs-abi
  const argBuffer = new Buffer(argString, 'hex');
  const argArr = abi.rawDecode(outputTypes, argBuffer);

  const reducer = (argObj: ArgumentsObject, currArg: any, index: number) => {
    const currName = outputNames[index];
    const currType = outputTypes[index];
    return {
      ...argObj,
      [currName]: parsePostDecodedValue(currType, currArg)
    };
  };

  return objReduce(argArr, reducer);
};

export const decodeReturnValue = (
  str: string,
  func: IAugmentedAbiFunction
): IDecode => {
  const { methodSelector, derived: { outputNames, outputTypes } } = func;
  const cleanStr = str.replace(`0x${methodSelector}`, '').replace('0x', '');
  const retBuffer = new Buffer(cleanStr, 'hex');
  const retArr = abi.rawDecode(outputTypes, retBuffer);
  const reducer = (argObj: ArgumentsObject, currRet: any, index: number) => {
    const name = outputNames[index];
    const type = outputTypes[index];
    
    return {
      ...argObj,
      [name]: parsePostDecodedValue(type, currRet)
    };
  };
  return objReduce(retArr, reducer);
};
