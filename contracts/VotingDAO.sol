// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingDAO {
    address public admin;
    uint public proposalCount;

    struct Proposal {
        string description;
        uint voteCount;
        bool active;
    }

    mapping(uint => Proposal) public proposals;
    mapping(address => bool) public users;
    mapping(uint => mapping(address => bool)) public votes;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyUser() {
        require(users[msg.sender], "Not a DAO member");
        _;
    }

    constructor() {
        admin = msg.sender;
        users[msg.sender] = true;
    }

    function addUser(address user) public onlyAdmin {
        users[user] = true;
    }

    function removeUser(address user) public onlyAdmin {
        require(users[user], "User not found");
        users[user] = false;
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "Invalid address");
        admin = newAdmin;
    }

    function createProposal(string memory description) public onlyUser {
        proposals[proposalCount] = Proposal(description, 0, true);
        proposalCount++;
    }

    function vote(uint proposalId) public onlyUser {
        require(proposals[proposalId].active, "Voting closed");
        require(!votes[proposalId][msg.sender], "Already voted");

        votes[proposalId][msg.sender] = true;
        proposals[proposalId].voteCount++;
    }

    function closeProposal(uint proposalId) public onlyAdmin {
        proposals[proposalId].active = false;
    }

    function getAllProposals() public view returns (Proposal[] memory) {
        Proposal[] memory result = new Proposal[](proposalCount);
        for (uint i = 0; i < proposalCount; i++) {
            result[i] = proposals[i];
        }
        return result;
    }

    function isVotingOpen(uint proposalId) public view returns (bool) {
        return proposals[proposalId].active;
    }

    function getVoteCount(uint proposalId) public view returns (uint) {
        return proposals[proposalId].voteCount;
    }
}
