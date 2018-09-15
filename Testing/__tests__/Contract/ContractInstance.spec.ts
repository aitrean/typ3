import BN from 'bn.js';
import { ISimpleContract, ISimpleContractConnected, IComplexContract, IComplexContractConnected } from '../../contracts/abiTypes';
import { ProxiedNode, CreateContract, ContractInstance } from '../../../src/lib';
import { simpleContractBytecode, complexContractBytecode } from '../../contracts'
import { startServer, stopServer, TEST_ETH_ADDRESS_A, TEST_SERVER_ENDPOINT } from '../../helpers';

const simpleContractAbi = require('../../contracts/simple/SimpleContract.json');
const complexContractAbi = require('../../contracts/complex/ComplexContract.json')
const testNode = ProxiedNode(TEST_SERVER_ENDPOINT)

//TODO clear port after throw events

beforeAll(() => startServer());
afterAll(() => stopServer());

describe('contract instantiation', async () => {
  const bytesArgument = Buffer.alloc(32, 'testing')
  const uintArgument = new BN('100000000');
  let addresses: any = []

  beforeEach(async () => {
    addresses = await testNode.eth_accounts()
  })

  it('should deploy a blank contract', async () => {
    const testAbi = simpleContractAbi;
    const testContract = CreateContract<ISimpleContract>(testAbi)
    const testInstance = await ContractInstance<ISimpleContractConnected>(testContract, testNode, {txObj: {data: simpleContractBytecode, from: addresses[0], gas: '90000'}})
    const succeeded = (await testInstance.succeeded())[0]
    expect(testInstance.address)
    expect(succeeded).toEqual(true)
  })

  it('should deploy a contract with arguments, then instantiate from the deployment', async () => {
    const testAbi = complexContractAbi;
    const testContract = CreateContract<IComplexContract>(testAbi)
    const deployedInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: {arg0: uintArgument, arg1: bytesArgument}, txObj: {data: complexContractBytecode, from: addresses[0], gas: '90000'}})
    const deployedAddress = deployedInstance.address
    const testInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: deployedAddress})
    expect((await testInstance.a())[0]).toEqual(uintArgument.toString())
    expect((await testInstance.b())[0]).toEqual(bytesArgument)
  });

  it('should deploy a contract and then call some functions', async () => {
    const testAbi = complexContractAbi;
    const testContract = CreateContract<IComplexContract>(testAbi)
    const testInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: {arg0: uintArgument, arg1: bytesArgument}, txObj: {data: complexContractBytecode, from: addresses[0], gas: '90000'}}) //TODO if gas is not explicitly specified, constructor will throw, fix this.
    expect((await testInstance.callFunction0({arg0: uintArgument})).output0).toEqual(uintArgument.toString())
    expect(await testInstance.callFunction1({arg0: uintArgument, arg1: bytesArgument})).toEqual({output0: uintArgument.toString(), output1: bytesArgument})
  })

  it('should deploy a contract and then call some functions with dynamic return types', async () => {
    const testAbi = complexContractAbi;
    const testContract = CreateContract<IComplexContract>(testAbi)
    const testInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: {arg0: uintArgument, arg1: bytesArgument}, txObj: {data: complexContractBytecode, from: addresses[0], gas: '90000'}}) //TODO if gas is not explicitly specified, constructor will throw, fix this.
    expect((await testInstance.callFunctionDynamicBytes())[0].toString()).toEqual('ababa')
    expect((await testInstance.callFunctionDynamicUint())[0]).toEqual('9000000000')
  })

  it('should deploy a contract and then place some transactions', async () => {
    const testAbi = complexContractAbi;
    const testContract = CreateContract<IComplexContract>(testAbi)
    const testInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: {arg0: uintArgument, arg1: bytesArgument}, txObj: {data: complexContractBytecode, from: addresses[0], gas: '90000'}})
    await testInstance.sendFunction0({arg0: uintArgument}, {from: TEST_ETH_ADDRESS_A, gas: '90000'})
    expect((await testInstance.a())[0]).toEqual(uintArgument.toString())
    expect((await testInstance.b())[0]).toEqual(bytesArgument)
  })
})
