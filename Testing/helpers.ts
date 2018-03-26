
export const TEST_ETH_PKEY_A = '0x790c621f4df1a3bc6046121637d21f7dad77c31c504f2f8df762aaf60949991f';
export const TEST_ETH_PKEY_B = '0xc4a2d3a38f825d58756110605cb8b3fc85f62d40e71a230636f8e11a9680430c';
export const TEST_ETH_ADDRESS_A = '0x2eD1f9A7A7b8A30fb2f9150A81A87fdeb7ae5Cd2';
export const TEST_ETH_ADDRESS_B = '0xe024F80675f9CF3b720727aBF0Df0af6cDEEe7D4';

export const TEST_SERVER_ENDPOINT = 'http://localhost:8545'

const ganache = require('ganache-cli');

const serverParams = {
  port: 8545,
  accounts: [{
    secretKey: TEST_ETH_PKEY_A,
    balance: '0x56bc75e2d63100000' // 100 ether
  },{
    secretKey: TEST_ETH_PKEY_B,
    balance: '0x56bc75e2d63100000' // 100 ether
  }],
  unlocked_accounts: [
    TEST_ETH_ADDRESS_A,
    TEST_ETH_ADDRESS_B
  ],
  total_accounts: 0 //generate no random accounts
}
const ganacheServer = ganache.server(serverParams);

export const startServer = () => new Promise((resolve, reject) => {
  ganacheServer.listen(serverParams.port, (err: any) => {
    if (err) {
      return reject(err)
    }
    resolve();
  })
});

export const stopServer = () => new Promise((resolve, reject) => {
  ganacheServer.close((err: any) => {
    if (err) {
      return reject(err)
    }
    resolve();
  })
});
