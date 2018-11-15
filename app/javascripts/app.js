import "../stylesheets/app.css";
import {default as Web3c} from 'web3c';

import ballot_artifacts from '../../build/contracts/SecretBallot.json'

var web3c, account, SecretBallot, contractAddress;
var votingEnded = false;
var candidates = [];
var nameRegex = new RegExp('^\\w+$');

var getUrlParameter = function getUrlParameter(sParam) {
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

window.refreshVoteTotals = async function () {
    let totalVotes = await SecretBallot.methods.totalVotes().call();
    $("#total-votes").html(totalVotes.toString());

    var hasVoted = await SecretBallot.methods.hasVoted(account).call();

    $("#vote-status-alert").removeClass("blinking");
    if (hasVoted) {
      $("#vote-status-alert").text("Your vote has been registered.")
    } else {
      $("#vote-status-alert").text("You have not voted yet.")
    }

    if (!hasVoted && !votingEnded) {
      $(".vote-button").removeClass("hidden");
    } else {
      $(".vote-button").addClass("hidden");
    }
}

window.endVoting = async function () {
  let end = SecretBallot.methods.endVoting();
  let success = await end.send();
    if (success) {
      location.reload();
    } else {
      console.log("Error: you don't have permission to end voting.")
    }
}

window.voteForCandidate = async function (candidateName) {
  try {
    $("#vote-status-alert").text("Vote submitted. Please confirm in Metamask...").addClass("blinking");
    $("#candidate").val("");

    let vote = SecretBallot.methods.voteForCandidate(web3c.utils.fromAscii(candidateName));
    await  vote.send();
    refreshVoteTotals();
  } catch (err) {
    $("#vote-status-alert").text("Error: " + err);
    console.log(err);
  }
}

function startNew() {
  $("#new-ballot").removeClass("hidden");
  $(".table-responsive").addClass("hidden");
}

window.deploy = async function() {
  let candidates_ascii = $("#candidates").val().trim().split("\n");
  for (let i = 0; i < candidates_ascii.length; i++) {
    if (!nameRegex.test(candidates_ascii[i])) {
      $("#deploy-status").text("Error: candidate name '" + candidates_ascii[i] + "' is invalid. aborting.");
      return;
    }
  }

  let candidates = $("#candidates").val().trim().split("\n").map(web3c.utils.fromAscii);
  let protoBallot = new web3c.confidential.Contract(ballot_artifacts.abi, undefined, {from: account});
  try {
    let deployMethod = protoBallot.deploy({
      data: ballot_artifacts.bytecode,
      arguments: [candidates]
    });
    SecretBallot = await deployMethod.send();
  } catch(e) {
    $("#deploy-status").text("Error Deploying: " + e);
    return
  }
  // reload to run page that can be shared.
  window.location.href+="?ballot="+ SecretBallot.options.address;
}

async function runAt(address) {
  console.log("running ballot at ", address);
  SecretBallot = new web3c.confidential.Contract(ballot_artifacts.abi, address, {from: account});
    votingEnded = await SecretBallot.methods.votingEnded().call();
    const numCandidates = await SecretBallot.methods.numCandidates().call();

    const genPromisArr = function (numCandidates) {
      let output = [];
      for (let i = 0; i < numCandidates; i++) {
        output.push(SecretBallot.methods.candidateNames(i).call())
      }
      return output
    }

    let myPromises = genPromisArr(numCandidates);
    await Promise.all(myPromises)
        .then(async function (response) {

          for (let i = numCandidates - 1; i >= 0; i--) {
            let candidateName = web3c.utils.toUtf8(response[i]).toString();
            if (!nameRegex.test(candidateName)) {
              $("#voting-status").text("Error: candidate name was invalid. aborting.");
              return;
            }
            candidates.push(candidateName);

            $("#candidate-list").append('<tr><td>' + candidateName + '</td><td class="center"><span id="votes-' + candidateName + '">?</span></td><td class="center" style="width:150px"><a href="#" id="' + candidateName + '" onclick="voteForCandidate(\'' + candidateName + '\')" class="hidden btn btn-primary vote-button">Vote</a><div class"vote-div" id="row-' + candidateName + '"></td></tr>');
            if (votingEnded) {
              let votesForCandidate = await SecretBallot.methods.totalVotesFor(web3c.utils.fromAscii(candidateName)).call()
              $("#votes-" + candidateName).text(votesForCandidate);
            }
          }
        })

    if (votingEnded) {
      $("#voting-status").text("Finished");
    } else {
      $("#end-voting-div").removeClass("hidden");
      $("#wallet-div").removeClass("hidden");
      $("#voting-status").text("Active");
    }

    refreshVoteTotals();
}

function load() {
  console.log("window.ethereum = ", window.ethereum);
  web3c = new Web3c(window.ethereum);
  web3c.eth.getAccounts().then((a) => {
    if (!a.length) {
      $("#voting-status").text("Please unlock your wallet, and then reload.");
      return;
    }
    account = a[0];
    $("#wallet-address").text(account);

    contractAddress = getUrlParameter('ballot');
    if (contractAddress) {
      runAt(contractAddress);
    } else {
      startNew();
    }
  });
}

// attempt to unlock the metamask wallet
function unlock () {
  if (window.ethereum) {
    window.ethereum.enable().then(load).catch((e) => {
      console.error(e);
      $("#voting-status").text("Error: " + e);
    });
  } else {
    $("#voting-status").text("Error: Newer version of metamask needed!");
  }
}

$(document).ready(function () {
  Web3c.Promise.then(unlock);
});
