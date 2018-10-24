pragma solidity ^0.4.18;

contract SecretBallot {
  // The address of the account that created this ballot.
  address public ballotCreator;

  // Is voting finished? The ballot creator determines when to set this flag.
  bool public votingEnded;

  // Keep track of which addresses have voted already to prevent multiple votes.
  mapping (address => bool) public hasVoted;

  // Candidate names and vote totals
  bytes32[] public candidateNames;
  mapping (bytes32 => uint16) public votesReceived;

  // The total number of votes cast so far. Revealed before voting has ended.
  uint16 public totalVotes;

  constructor(bytes32[] _candidateNames) public {
    ballotCreator = msg.sender;
    candidateNames = _candidateNames;
  }

  function totalVotesFor(bytes32 candidate) view public returns (uint16) {
    require(validCandidate(candidate));
    require(votingEnded);  // Don't reveal votes until voting has ended
    return votesReceived[candidate];
  }

  function numCandidates() public constant returns(uint count) {
    return candidateNames.length;
  }

  function voteForCandidate(bytes32 candidate) public {
    require(!votingEnded);
    require(validCandidate(candidate));
    require(!hasVoted[msg.sender]);

    votesReceived[candidate] += 1;
    hasVoted[msg.sender] = true;
    totalVotes += 1;
  }

  function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateNames.length; i++) {
      if (candidateNames[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function endVoting() public returns (bool) {
    require(msg.sender == ballotCreator);  // Only ballot creator can end the vote.
    votingEnded = true;
    return true;
  }

}