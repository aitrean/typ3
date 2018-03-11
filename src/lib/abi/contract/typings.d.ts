import { IFactory } from "../function/typings";

interface IOutputMappings {
  [abiFuncName: string]: string[];
}

interface IContract {
  [behaviour: string]: any
}