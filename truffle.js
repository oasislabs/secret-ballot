// Allows us to use ES6 in our migrations and tests.
require('babel-register')

let HDWalletProvider = require('truffle-hdwallet-provider')
let mnemonic = "<private key mnemonic>"

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 6600000
    },
    oasis: {
      provider: () => new HDWalletProvider(mnemonic, "https://web3.oasiscloud.io"),
      network_id: "*",
      gas: 3000000,
      gasPrice: 50000000000
    }
  }
}
