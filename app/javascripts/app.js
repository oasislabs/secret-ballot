import "../stylesheets/app.css";
import {default as Web3} from 'web3';
import {default as contract} from 'truffle-contract'

import ballot_artifacts from '../../build/contracts/SecretBallot.json'

var account = web3.eth.accounts[0];
var SecretBallot = contract(ballot_artifacts);
var contractAddress;
var votingEnded = false;
var candidates = [];

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

window.refreshVoteTotals = function () {
  SecretBallot.at(contractAddress).then(async function (contractInstance) {

    let totalVotes = await contractInstance.totalVotes.call();
    $("#total-votes").html(totalVotes.toString());

    var hasVoted = await contractInstance.hasVoted.call(account);

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
  })
}

window.endVoting = function () {
  SecretBallot.at(contractAddress).then(async function (contractInstance) {
    let success = await contractInstance.endVoting(({gas: 140000, from: web3.eth.accounts[0]}));
    if (success) {
      location.reload();
    } else {
      console.log("Error: you don't have permission to end voting.")
    }
  })
}

window.voteForCandidate = function (candidateName) {
  try {
    $("#vote-status-alert").text("Vote submitted. Please confirm in Metamask...").addClass("blinking");
    $("#candidate").val("");

    SecretBallot.at(contractAddress).then(async function (contractInstance) {
      try {
        await contractInstance.voteForCandidate(candidateName, {gas: 140000, from: web3.eth.accounts[0]});
      } catch (err) {

      }
      refreshVoteTotals();
    });
  } catch (err) {
    $("#vote-status-alert").text("Error: " + err);
    console.log(err);
  }
}

$(document).ready(function () {
  contractAddress = getUrlParameter('ballot');
  $("#wallet-address").text(account);

  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545.");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  SecretBallot.setProvider(web3.currentProvider);

  SecretBallot.at(contractAddress).then(async function (contractInstance) {

    votingEnded = await contractInstance.votingEnded.call();
    const numCandidates = await contractInstance.numCandidates.call();

    const genPromisArr = function (numCandidates) {
      let output = [];
      for (let i = 0; i < numCandidates; i++) {
        output.push(contractInstance.candidateNames.call(i))
      }
      return output
    }

    let myPromises = genPromisArr(numCandidates);
    await Promise.all(myPromises)
        .then(async function (response) {

          for (let i = numCandidates - 1; i >= 0; i--) {
            let candidateName = web3.toUtf8(response[i]).toString();
            candidates.push(candidateName);

            $("#candidate-list").append('<tr><td>' + candidateName + '</td><td class="center"><span id="votes-' + candidateName + '">?</span></td><td class="center" style="width:150px"><a href="#" id="' + candidateName + '" onclick="voteForCandidate(\'' + candidateName + '\')" class="hidden btn btn-primary vote-button">Vote</a><div class"vote-div" id="row-' + candidateName + '"></td></tr>');
            if (votingEnded) {
              let votesForCandidate = await contractInstance.totalVotesFor.call(candidateName)
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
  });
})
