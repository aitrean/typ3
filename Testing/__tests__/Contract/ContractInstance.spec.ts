import BN from 'bn.js';
import { ISimpleContract, ISimpleContractConnected, IComplexContract, IComplexContractConnected } from '../../contracts/abiTypes';
import { ProxiedNode, CreateContract, ContractInstance } from '../../../src/lib';
import { simpleContractBytecode, complexContractBytecode } from '../../contracts'

const testNode = ProxiedNode('http://localhost:8545')

describe('contract instantiation', async () => {
  const bytesArgument = Buffer.alloc(32, 'testing')
  const uintArgument = new BN('100000000');
  const intArgument0 = new BN('-100000000');
  const intArgument1 = new BN('150000000')
  let addresses: any = []

  beforeEach( async () => {
    addresses = await testNode.eth_accounts()
  })

  it('should deploy a blank contract', async () => {
    const testAbi = require('../../Contracts/simple/SimpleContract.json');
    const testContract = CreateContract<ISimpleContract>(testAbi)
    const testInstance = await ContractInstance<ISimpleContractConnected>(testContract, testNode, {txObj: {data: simpleContractBytecode, from: addresses[0], gas: '90000'}})
    const succeeded = (await testInstance.succeeded())[0]
    expect(testInstance.address)
    expect(succeeded).toEqual(true)
  })

  it('should deploy a contract with arguments, then instantiate from the deployment', async () => {
    const testAbi = require('../../Contracts/complex/complexContract.json');
    const testContract = CreateContract<IComplexContract>(testAbi)
    const deployedInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: {arg0: uintArgument, arg1: bytesArgument}, txObj: {data: complexContractBytecode, from: addresses[0], gas: '90000'}})
    const deployedAddress = deployedInstance.address
    const testInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: deployedAddress})
    expect((await testInstance.a())[0]).toEqual(uintArgument.toString())
    expect((await testInstance.b())[0]).toEqual(bytesArgument)
  });

  it('should deploy a contract and then call some functions', async () => {
    const testAbi = require('../../Contracts/complex/complexContract.json');
    const testContract = CreateContract<IComplexContract>(testAbi)
    const testInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: {arg0: uintArgument, arg1: bytesArgument}, txObj: {data: complexContractBytecode, from: addresses[0], gas: '90000'}}) //TODO if gas is not explicitly specified, constructor will throw, fix this.
    expect((await testInstance.callFunction0({arg0: uintArgument})).output0).toEqual(uintArgument.toString())
    expect(await testInstance.callFunction1({arg0: uintArgument, arg1: bytesArgument})).toEqual({output0: uintArgument.toString(), output1: bytesArgument})
  })

  it('should deploy a contract and then place some transactions', async () => {
    const testAbi = require('../../Contracts/complex/complexContract.json');
    const testContract = CreateContract<IComplexContract>(testAbi)
    const testInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: {arg0: uintArgument, arg1: bytesArgument}, txObj: {data: complexContractBytecode, from: addresses[0], gas: '90000'}})
    await testInstance.sendFunction0({arg0: uintArgument}, {from: '0x06e854758939a6125febce9efcdbe80031dd059d', gas: '90000'})
    expect((await testInstance.a())[0]).toEqual(uintArgument.toString())
    expect((await testInstance.b())[0]).toEqual(bytesArgument)
  })
  /*
  it('should deploy a contract and invoke two different methods with the same name', async () => {
    const testAbi = require('../../Contracts/complex/complexContract.json');
    const testContract = CreateContract<IComplexContract>(testAbi)
    const testInstance = await ContractInstance<IComplexContractConnected>(testContract, testNode, {parameters: {arg0: uintArgument, arg1: bytesArgument}, txObj: {data: complexContractBytecode, from: '0x06e854758939a6125febce9efcdbe80031dd059d', gas: '90000'}})
    expect(await testInstance.overloadedFunction({arg0: uintArgument})).toEqual(uintArgument)
    expect((await testInstance.overloadedFunction({arg0: intArgument0, arg1: intArgument1}))[0]).toEqual(intArgument0.add(intArgument1))
  })*/
})
