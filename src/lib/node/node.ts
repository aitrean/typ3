import fetch from 'node-fetch';
export class Node {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  setEndpoint = (endpoint: string) => (this.endpoint = endpoint);

  sendRPCRequest = async (request: IRPCRequestObj) => {
    const { txObj, postprocessor, errorHandler } = request;
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(txObj)
    }).then(r => r.json());
    console.log('response', response);
    const result = response.error
      ? errorHandler(response.error)
      : postprocessor(response);
    return result;
  };
}
