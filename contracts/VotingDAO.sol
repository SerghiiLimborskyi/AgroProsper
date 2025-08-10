struct Proposal {
    string description;
    uint256 voteCount;
    bool active;
}

mapping(address => bool) voters;
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
