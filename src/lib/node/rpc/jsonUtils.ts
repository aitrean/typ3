import { ITransactionObject } from '../typings';
import { randomBytes } from 'crypto';

export const generateId = (): String => randomBytes(16).toString('hex');

export const generateTxObj = (tx: ITransactionObject) => ({
  id: generateId(),
  jsonrpc: '2.0',
  ...tx
});

export const JSONPostProcessor = (handler: any = null) => ({ result }: any) =>
  handler && typeof handler === 'function' ? handler(result) : result;

export const JSONErrorHandler = (handler: any = null) => (e: Error) => {
  if (handler && typeof handler === 'function') {
    return handler(e);
  } else {
    throw Error(e.message);
  }
};
