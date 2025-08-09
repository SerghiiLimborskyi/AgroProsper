
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract UserRegistry {
    address public owner;
    IERC20 public token;

    struct Proposal {
    string description;
    uint256 voteCount;
    bool active;
    mapping(address => bool) voters;
}

mapping(uint256 => Proposal) public proposals;
uint256 public proposalCount;

event ProposalCreated(uint256 indexed id, string description);
event Voted(address indexed voter, uint256 indexed proposalId);

function createProposal(string memory description) public onlyAdmin {
    Proposal storage p = proposals[proposalCount];
    p.description = description;
    p.active = true;
    proposalCount++;

    emit ProposalCreated(proposalCount - 1, description);
}

function vote(uint256 proposalId) public {
    require(isUser(msg.sender), "Not registered");
    Proposal storage p = proposals[proposalId];
    require(p.active, "Proposal inactive");
    require(!p.voters[msg.sender], "Already voted");

    p.voteCount++;
    p.voters[msg.sender] = true;

    emit Voted(msg.sender, proposalId);
}

    struct User {
        string name;
        string email;
        bool isRegistered;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed user, string name, string email);
    event RewardSent(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

    function register(string memory _name, string memory _email) public {
        require(!users[msg.sender].isRegistered, "Already registered");
        users[msg.sender] = User(_name, _email, true);
        emit UserRegistered(msg.sender, _name, _email);
    }

    function rewardUser(address _user) public onlyOwner {
        require(users[_user].isRegistered, "Not registered");
        uint256 rewardAmount = 100 * 10**18;
        require(token.transfer(_user, rewardAmount), "Transfer failed");
        emit RewardSent(_user, rewardAmount);
    }

    function isUser(address _addr) public view returns (bool) {
        return users[_addr].isRegistered;
    }
}
