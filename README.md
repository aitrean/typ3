# THIS IS ALPHA SOFTWARE.

# typ3 -- A typescript, promise-only alternative to web3

ABI Type Generator Package -- https://github.com/Mike-Stupich/typ3-cli
 
- Uses typed-objects in parameters instead of arrays to call contracts for position-agnostic calls 
- Uses typed-objects in outputs, eliminating the need to guess what values they are 
- Automatically chooses between a transaction and call on invocation via proxies
- Currently only supports ABI functions 
- Fully typed contracts and rpc-calls

This library allows you to dynamically construct a fully-typed (more on this below) object representation of the ABI, including methods for encoding, decoding, and calling the contract.

It provides a lightweight alternative to web3’s contract interaction functionalities, with full type support and better error reporting.

We accomplish better reporting by using objects instead of arrays for the contract arguments and return values. This allows us to specify value typings for each argument, and provide more specific error based on the specific invalid input.

In addition, the library makes heavy use of ES6 proxies to intercept on method invocations on contract methods and node RPC methods. For contracts, this provides the ability to re-route method invocations depending on if a method is constant / payable or not. For RPC methods, they're used to keep both the RPC requests and the node library itself separate, with the proxy acting as a bridge between the two.

RPC methods themselves are designed to be highly configurable, with the ability to have pre/post processing functions and custom error handlers of the call. (Ex. Convert any BigNumber input to a string before the actual RPC call is sent, map the returned data to the node in any way you'd like, handle any RPC errors in a custom handler)

##  Node(endpoint) 

Returns an instance that provides a connection to a node with rpc methods as described in https://github.com/ethereum/wiki/wiki/JSON-RPC. 
Also has a .setEndpoint function for connecting to a different node

## <ABI_TYPE>CreateContract(json_abi [, outputMappings])
 - json_abi The json abi of the smart contract to interact with
 - [optional] outputMappings An object of arrays that hold mappings for un-named output parameters, it should match the same outputMappings file used for generating ABI_TYPE from `typ3-cli`

Returns a contract instance of ABI_TYPE that has methods with the same mapping as the smart contract. ABI_TYPE is generated from the `typ3-cli` package to provide typing support for the contract instance. Each method provides encoding and decoding functions for input and output of the smart contract. 

## <ABI_TYPE_CONNECTED>ConnectedContract(contract_instance, node_instance [, txObj])
 - contract_instance The contract instance to connect to the specified node 
 - node_instance The node to send calls to 
 - [optional] txObj Allows for default parameters such as `to, from, value, gas`. 
Returns a contract instance that is connected to an existing node. Each method is directly invokable. 

### Contract Instance
- myContract.myMethod 
    - encodeArguments(paramsObj)
    - decodeArguments(encodedData)
    - decodeReturnValue(encodedData)

### Connected Contract Instance
- myContract.myMethod(paramsObj, txObj)

### How the paramsObj is specified

```js 
  {
    "constant": true,
    "inputs": [
      { "name": "_a", "type": "uint256" },
      { "name": "_c", "type": "uint256" }
    ],
    "name": "ppb",
    "outputs": [{ "name": "b", "type": "uint256" }],
    "type": "function"
  },
```
Given the above abi function, paramsObj would be: 

```js
{   
    _a: string | BigNumber | BN,  
    _c: string | BigNumber | BN
}
```
And the returned value as the following shape 

```js
{
    b: string
}
```

If outputs was the following instead: `"outputs": [{ "name": "", "type": "uint256" }],`

We would have this: 
```js
{
    0: string
}
```

Unless a user supplied outputMapping was provided, then it would be:

```js
const outputMappings = {
    ppb: ["myName"]
}

{
    "myName": string
}
```

Contributors
- Henry Nguyen
- Mike Stupich
- Nicholas Lewanowicz
- Jaimin Darji
