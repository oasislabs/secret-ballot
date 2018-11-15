pragma solidity ^0.4.18;

contract SecretBallot {
    // The address of the account that created this ballot.
    address public ballotCreator;

    // Is voting finished? The ballot creator determines when to set this flag.
    bool public votingEnded;

    // Candidate names
    bytes32[] public candidateNames;

    // Keep track of which addresses have voted already to prevent multiple votes.
    mapping (address => bool) public hasVoted;

    // Tallies for each candidate
    mapping (bytes32 => uint256) private votesReceived;

    // The total number of votes cast so far. Revealed before voting has ended.
    uint256 public totalVotes;

    constructor(bytes32[] _candidateNames) public {
        ballotCreator = msg.sender;
        candidateNames = _candidateNames;
    }

    function voteForCandidate(bytes32 candidate) public {
        // can only vote during voting period
        require(!votingEnded);
        // candidate must be part of the ballot
        require(validCandidate(candidate));
        // one vote per address (not sybil resistant)
        require(!hasVoted[msg.sender]);
        // prevent overflow
        require(votesReceived[candidate] < ~uint256(0));
		require(totalVotes < ~uint256(0));

        votesReceived[candidate] += 1;
        hasVoted[msg.sender] = true;
        totalVotes += 1;
    }

    function endVoting() public returns (bool) {
        require(msg.sender == ballotCreator);  // Only ballot creator can end the vote.
        votingEnded = true;
        return true;
    }

    function totalVotesFor(bytes32 candidate) view public returns (uint256) {
        require(validCandidate(candidate));
        require(votingEnded);  // Don't reveal votes until voting has ended
        return votesReceived[candidate];
    }

    function numCandidates() public constant returns(uint count) {
        return candidateNames.length;
    }

    function validCandidate(bytes32 candidate) view public returns (bool) {
        for(uint i = 0; i < candidateNames.length; i++) {
            if (candidateNames[i] == candidate) {
                return true;
            }
        }
        return false;
    }
}
