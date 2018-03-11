import { ConstructorFactory } from './../function/index';
import { FunctionFactory } from '../function';
import { objReduce } from '../function/components/utils';
import { IAbiFunction, IFuncOutputMappings, IAbiBehaviour, IAbiConstructor } from '../function/typings';
import { IOutputMappings } from './typings';

const constructorCall = 'new'  //TODO move this

export enum AbiMethodTypes {
  function = 'function',
  event = 'event',
  constructor = 'constructor'
}

export interface Selector {
  [AbiMethodTypes.function]: any
  [AbiMethodTypes.event]: any
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
    const { name, type } = currMethod;
    const handler = selector[type];
    if(type === AbiMethodTypes.constructor){
      constructorDefinition = handler(currMethod)
    }
    return handler && name ? {
      ...compiledContract,
      [name]: handler(currMethod, outputMappings[name])
    } : compiledContract
  }
  let contract = objReduce(abi, reducer);
  contract[constructorCall] = constructorDefinition ? constructorDefinition : selector[AbiMethodTypes.constructor]
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

  [AbiMethodTypes.event]: (
    abiFunc: IAbiFunction,
    outputMappings: IFuncOutputMappings
  ) => ''
};
