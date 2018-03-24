import BN from 'bn.js';
import { toChecksumAddress } from 'ethereumjs-util';
import { isBigNumber } from './utils';
import { IUserSuppliedArgs, IAugmentedAbiFunction, IAugmentedAbiConstructor } from '../../typings';

export const parseSuppliedArgs = (
  userSuppliedArgs: IUserSuppliedArgs,
  func: IAugmentedAbiFunction | IAugmentedAbiConstructor
) => {
  const { derived: { inputNames }, argHandlers } = func;
  const errArr: string[] = [];
  const parsedResult = inputNames.map((name: any) => {
    const { type } = argHandlers[name];
    //TODO: parse args based on type
    if (!userSuppliedArgs[name]) {
      errArr.push(`Expected argument "${name}" of type "${type}" missing`);
    }

    const argValue = userSuppliedArgs[name];

    return argHandlers[name].processInput(argValue).value;
  });
  if (errArr.length > 0) {
    const errStr = errArr.join('\n');
    throw Error(`${errStr}\nSupplied Arguments: ${JSON.stringify(userSuppliedArgs, null, 2)} 
`);
  } else {
    return parsedResult;
  }
};

export const parsePostDecodedValue = (type: string, value: any): Buffer | boolean | string => {
  if(type.includes('bytes')){
    return Buffer.from(value)
  } else if(type === 'bool'){
    return value;
  } else {
    return value.toString()
  }
};

export const parsePreEncodedValue = (type: string, value: any): Buffer | boolean | string => {
  if(type.includes('bytes')){
    return Buffer.from(value)
  } else if(type === 'bool'){
    return value;
  } else {
    return value.toString()
  }
}
