import { ConstructorFactory } from './../function/index';
import { FunctionFactory } from '../function';
import { objReduce } from '../function/components/utils';
import { IAbiFunction, IFuncOutputMappings, IAbiBehaviour, IAbiConstructor } from '../function/typings';

export const constructorCall = 'new'  //TODO move this

export enum AbiMethodTypes {
  function = 'function',
  event = 'event',
  constructor = 'constructor',
  filter = 'filter'
}

interface IOutputMappings {
  [abiFuncName: string]: string[];
}

export interface Selector {
  [AbiMethodTypes.function]: any
  [AbiMethodTypes.constructor]: any
}
interface Contract {
  [name: string]: IAbiBehaviour
}

export const CreateContract = <T>(
  abi: IAbiBehaviour[],
  outputMappings: IOutputMappings = {}
) => {
  let constructorDefinition: IAbiConstructor | undefined;
  const reducer = (compiledContract: Contract, currMethod: IAbiBehaviour) => {
    const { name, type } = currMethod
    const handler = selector[type];
    switch(type){
      case(AbiMethodTypes.function):
        return {
          ...compiledContract,
          [name]: handler(currMethod, outputMappings[name])
        }
      case(AbiMethodTypes.constructor):
        return {
          ...compiledContract,
          ['new']: handler(currMethod) //TODO change the constructor naming scheme
        }
    }
  }
  let contract = objReduce(abi, reducer);
  return contract as T;
};

//TODO add support for events
const selector: Selector = {
  [AbiMethodTypes.function]: (
    abiFunc: IAbiFunction,
    outputMappings: IFuncOutputMappings
  ) => FunctionFactory(abiFunc, outputMappings),

  [AbiMethodTypes.constructor]: (
    abiFunc: IAbiConstructor,
  ) => ConstructorFactory(abiFunc),
};
