# Secret Ballot dApp

This dApp demonstrates confidentiality using a voting smart contract that keeps each user's vote private and hides
vote tallies until voting has ended. It serves as an example app for our Web3(c) library.

To interact with this dApp locally follow the steps below.

## Initial Setup

* Run `npm install`

* To modify the contract, run `npm install -g truffle`

## Building & Deploying the Smart Contract
To build a new ballot, run:

* `truffle compile`

You can deploy the contract with truffle. to do so:

* Edit `truffle.js` to add the mnemonic for your private key. This will be the address that deploys the smart contract;
you must control this address if you want to end voting from the dApp!

* `truffle migrate --reset --network oasis`

Note the address of the deployed contract in the output
```
...
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Replacing SecretBallot...
  ... 0x473e196528a48d27d5488dddf9bb8a351caa6bfe41a44b8e9fca0c935142db90
  SecretBallot: 0x1dd2838d8290dd83d5d060d1b3d2cc1eae0ac5f7
```

In this example the ballot was deployed to address `0x1dd2838d8290dd83d5d060d1b3d2cc1eae0ac5f7`

## Interacting with the dApp

* Launch the local web server: `npm run dev`

* In your browser visit `localhost:8080?ballot=<contract address>`

## Notes and Troubleshooting
* The smart contract code is available at `contracts/SecretBallot.sol`
* If you don't see anything in the web browser, ensure your Metamask is unlocked and configured for the Oasis testnet
* Due to rate limiting the web UI doesn't always display complete information. If the page doesn't fully populate you may
need to wait a few seconds and refresh the page
* To change the ballot options, edit `migrations/2_deploy_contracts.js` then re-deploy using the instructions above
