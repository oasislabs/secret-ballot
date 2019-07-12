import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';

import App from './App.vue';
import './plugins/vuetify';
import router from './router';

import oasis from '@oasislabs/client';

let SecretBallot;

// TODO: Eliminate wallet and transition to Developer Gateway
// Wallet private key.
const privateKey = '<private key>';

// Wallet for signing and paying for transactions.
const wallet = new oasis.Wallet(privateKey);

// Ethereum gateway responsible for signing transactions.
const gateway = new oasis.gateways.Web3Gateway('wss://web3.devnet.oasiscloud-staging.net/ws', wallet);

oasis.setGateway(gateway);

// Ballot Instantiation
window.deployService = async (constructorArgs) => {
  const bytecode = await fetch('/assets/bytecode/ballot.wasm')
    .then(response => response.body)
    .then(stream => new Response(stream))
    .then(async (response) => {
      const bytecode = await response.arrayBuffer();
      return new Uint8Array(bytecode);
    });

  SecretBallot = await oasis.deploy({
    bytecode,
    arguments: constructorArgs,
    header: { confidential: false },
  }).then((service) => {
    return service;
  });
};

window.loadService = async (address) => {
  SecretBallot = oasis.Service.at(address);
}

// Ballot API
window.getCandidates = async () => {
  const x = await SecretBallot.candidates();
  return SecretBallot.candidates();
}

window.getDescription = async () => {
  return SecretBallot.description();
}

window.getWinner = async () => {
  return SecretBallot.winner();
}

window.castVote = async (candidateNum) => {
  SecretBallot.vote(candidateNum);
}

window.closeBallot = async () => {
  SecretBallot.close();
}

Vue.config.productionTip = false;
Vue.component('v-apex-chart', VueApexCharts);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
