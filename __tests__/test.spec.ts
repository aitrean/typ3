import { ITest, ITestConnected } from './../abiTypes';
import { ProxiedNode, CreateContract, ConnectedContract } from '../src/lib'

describe('initial test', () => {
	const myTest = require('../test.json')
	const myRawContract = CreateContract<ITest>(myTest)
	const myNode = ProxiedNode('https://ropsten.infura.io/KCTSpjCDQEfxMuBxGv2Q')
	const myContract = ConnectedContract<ITestConnected>(myRawContract, myNode)
	console.log(myContract)
	it('should make a call', () => {
		expect(myContract.balanceOf({who: '0x583cbBb8a8443B38aBcC0c956beCe47340ea1367'})).toEqual('')
	})
})