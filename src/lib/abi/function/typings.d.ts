type IO = { name: string; type: string };

interface IFunctionFactory {
  constant: boolean;
  paramless: boolean;
  decodeArguments: (args: string) => IDecode;
  decodeReturnValue: (ret: string) => IDecode;
  encodeArguments: (args: any) => string;
}

interface IAbiFunction {
  name: string;
  inputs: IO[];
  outputs: IO[];
  constant: boolean;
  type: string;
  payable: boolean;
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
