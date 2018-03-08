import { randomBytes } from 'crypto';

const generateId = (): String => randomBytes(16).toString('hex');

export const generateTxObj = (tx: ITransactionObj | ICallTxObj) => ({
  id: generateId(),
  jsonrpc: '2.0',
  ...tx
});

export const JSONPostParser = (parser: any = null) => ({ result }: any) =>
  parser && typeof parser === 'function' ? parser(result) : result;

export const JSONErrorHandler = (handler: any = null) => (e: Error) => {
  if (handler && typeof handler === 'function') {
    return handler(e);
  } else {
    throw Error(e.message);
  }
};
