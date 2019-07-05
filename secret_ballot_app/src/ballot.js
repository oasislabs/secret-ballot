import { default as Web3c } from 'web3c';

import ballot_artifacts from '../../build/contracts/SecretBallot.json'

var web3c, account, SecretBallot, contractAddress;
var votingEnded = false;
var candidates = [];
var nameRegex = new RegExp('^\\w+$');

var getUrlParameter = function getUrlParameter (sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};

export function getSecretBallot () {
  return SecretBallot;
}

export async function endVoting () {
  let end = SecretBallot.methods.endVoting();
  let success = await end.send();
    if (success) {
      location.reload();
    } else {
      console.log("Error: you don't have permission to end voting.")
    }
}

export async function voteForCandidate (candidateName) {
  try {
    let vote = SecretBallot.methods.voteForCandidate(web3c.utils.fromAscii(candidateName));
    await vote.send();
    refreshVoteTotals();
  } catch (err) {
    console.log(err);
  }
}

export async function deploy () {
  let protoBallot = new web3c.oasis.Contract(ballot_artifacts.abi, undefined, {from: account});
  try {
    let deployMethod = protoBallot.deploy({
      data: ballot_artifacts.bytecode,
      arguments: [candidates]
    });
    SecretBallot = await deployMethod.send();
  } catch(e) {
    console.log("Error Deploying: " + e);
    return
  }
  // reload to run page that can be shared.
  let separator;
  if (window.location.search) {
    separator = '&';
  } else {
    separator = '?';
  }
  window.location.href += separator + "ballot=" + SecretBallot.options.address;
}

async function runAt (address) {
  console.log("running ballot at ", address);
  SecretBallot = new web3c.oasis.Contract(ballot_artifacts.abi, address, {from: account});
}

async function load () {
  console.log("window.ethereum = ", window.ethereum);
  if (getUrlParameter('insecureTestingKeys') === '1') {
    console.warn("Using unsecret key manager signing key");
    web3c = new Web3c(window.ethereum, undefined, {
      // This public key corresponds to an insecure key used for local key manager testing.
      keyManagerPublicKey: '0x9d41a874b80e39a40c9644e964f0e4f967100c91654bfd7666435fe906af060f',
    });
  } else {
    web3c = new Web3c(window.ethereum);
  }
  const a = await web3c.eth.getAccounts();
  if (!a.length) {
    console.log("Please unlock your wallet, and then reload.");
    return;
  }
  account = a[0];

  contractAddress = getUrlParameter('ballot');
  if (contractAddress) {
    await runAt(contractAddress);
  }
}

// attempt to unlock the Metamask wallet
export async function unlock () {
  await Web3c.Promise;
  if (window.ethereum) {
    await window.ethereum.enable();
    try {
      await load();
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log("Error: Newer version of metamask needed!");
  }
}
