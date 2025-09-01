// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAGTToken {
    function getVotes(address account) external view returns (uint256);
    function delegateVotes(address to) external;
}

contract VotingDAO {
    address public admin;
    uint public proposalCount;
    IAGTToken public token;

    struct Proposal {
        string description;
        uint voteCount;
        bool active;
    }

    mapping(uint => Proposal) public proposals;
    mapping(uint => mapping(address => bool)) public hasVoted;

    event ProposalCreated(uint indexed proposalId, string description);
    event Voted(uint indexed proposalId, address indexed voter, uint weight);
    event ProposalClosed(uint indexed proposalId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor(address tokenAddress) {
        admin = msg.sender;
        token = IAGTToken(tokenAddress);
    }

    function createProposal(string memory description) public onlyAdmin {
        proposals[proposalCount] = Proposal(description, 0, true);
        emit ProposalCreated(proposalCount, description);
        proposalCount++;
    }

    function vote(uint proposalId) public {
        require(proposals[proposalId].active, "Voting closed");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        uint weight = token.getVotes(msg.sender);
        require(weight > 0, "No voting power");

        proposals[proposalId].voteCount += weight;
        hasVoted[proposalId][msg.sender] = true;

        emit Voted(proposalId, msg.sender, weight);
    }

    function closeProposal(uint proposalId) public onlyAdmin {
        proposals[proposalId].active = false;
        emit ProposalClosed(proposalId);
    }

    function getProposal(uint proposalId) public view returns (string memory, uint, bool) {
        Proposal memory p = proposals[proposalId];
        return (p.description, p.voteCount, p.active);
    }
}
