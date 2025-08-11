const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingDAO", function () {
  let dao, owner, user1, user2;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();
    const DAO = await ethers.getContractFactory("VotingDAO");
    dao = await DAO.deploy();
    await dao.deployed();
  });

  it("should add and remove users", async () => {
    await dao.addUser(user1.address);
    expect(await dao.users(user1.address)).to.be.true;

    await dao.removeUser(user1.address);
    expect(await dao.users(user1.address)).to.be.false;
  });

  it("should change admin", async () => {
    await dao.changeAdmin(user1.address);
    expect(await dao.admin()).to.equal(user1.address);
  });

  it("should create and retrieve proposals", async () => {
    await dao.createProposal("Test Proposal");
    const proposals = await dao.getAllProposals();
    expect(proposals.length).to.equal(1);
    expect(proposals[0].description).to.equal("Test Proposal");
  });

  it("should allow voting and count votes", async () => {
    await dao.createProposal("Vote Proposal");
    await dao.addUser(user1.address);
    await dao.connect(user1).vote(0);
    expect(await dao.getVoteCount(0)).to.equal(1);
  });

  it("should close proposal and check status", async () => {
    await dao.createProposal("Close Proposal");
    await dao.closeProposal(0);
    expect(await dao.isVotingOpen(0)).to.be.false;
  });
});
