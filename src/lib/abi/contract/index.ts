import { FunctionFactory } from '../function';
import { objReduce } from '../function/components/utils';

enum AbiMethodTypes {
  function = 'function',
  event = 'event',
  constructor = 'constructor'
}

interface Selector {
  [key: string]: any
}
interface Contract {
  [name: string]: ContractMethod
}

interface ContractMethod {
  name: string
  type: IAbiFunction
}

export const CreateContract = <T>(
  abi: IAbiFunction[],
  outputMappings: IOutputMappings = {}
) => {
  const reducer = (compiledContract: Contract, currMethod: IAbiFunction) => {
    const { name, type } = currMethod;
    const handler = selector[type];
    return handler
      ? {
          ...compiledContract,
          [name]: handler(currMethod, outputMappings[name])
        }
      : compiledContract;
  };
  const contract = objReduce(abi, reducer);
  return contract as T;
};

//TODO add support for events
const selector: Selector = {
  [AbiMethodTypes.function]: (
    abiFunc: IAbiFunction,
    outputMappings: IFuncOutputMappings
  ) => FunctionFactory(abiFunc, outputMappings)
};
