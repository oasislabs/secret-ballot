const HDWalletProvider = require("truffle-hdwallet-provider");

// add your mnemonic here
const MNEMONIC = "<private key mnemonic>"

module.exports = {
  networks: {
    oasis: {
      provider: function () {
        return new HDWalletProvider(MNEMONIC, "https://web3.oasiscloud-staging.net");
      },
      network_id: "42261",
      gasPrice: "0x3b9aca00"
    }
  },
  compilers: {
    external: {
      command: "./scripts/confidential-compile.js",
      targets: [{
        path: "./scripts/build/*.json",
      }]
    }
  }
};
