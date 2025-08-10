pragma solidity ^0.8.20;

contract VotingDAO {
    struct Proposal {
        string description;
        uint256 voteCount;
        bool active;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    uint256 public proposalCount;

    event ProposalCreated(uint256 indexed id, string description);
    event Voted(address indexed voter, uint256 indexed proposalId);

    function createProposal(string memory description) public {
        Proposal storage p = proposals[proposalCount];
        p.description = description;
        p.active = true;
        proposalCount++;
        emit ProposalCreated(proposalCount - 1, description);
    }

    function vote(uint256 proposalId) public {
        Proposal storage p = proposals[proposalId];
        require(p.active, "Proposal inactive");
        require(!hasVoted[proposalId][msg.sender], "Already voted");
        p.voteCount++;
        hasVoted[proposalId][msg.sender] = true;
        emit Voted(msg.sender, proposalId);
    }
}
