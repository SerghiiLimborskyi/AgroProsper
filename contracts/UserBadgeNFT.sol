// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UserBadgeNFT is ERC721URIStorage, Ownable {
    enum Role { Starter, Farmer, Trader }

    uint256 public tokenCounter;
    mapping(string => string) public badgeURIs; // badgeType => CID
    mapping(address => bool) public hasBadge;
    mapping(address => Role) public userRoles;

    constructor() ERC721("AgroProsperBadge", "APB") {
        tokenCounter = 0;
    }

    function updateCID(string memory badgeType, string memory cid) public onlyOwner {
        badgeURIs[badgeType] = string(abi.encodePacked("ipfs://", cid));
    }

    function mintBadge(address to, Role role) external onlyOwner {
        require(!hasBadge[to], "User already has a badge");

        string memory badgeType;
        if (role == Role.Starter) badgeType = "starter";
        else if (role == Role.Farmer) badgeType = "farmer";
        else badgeType = "trader";

        string memory uri = badgeURIs[badgeType];
        require(bytes(uri).length > 0, "Badge type not set");

        uint256 newTokenId = tokenCounter;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, uri);

        tokenCounter++;
        hasBadge[to] = true;
        userRoles[to] = role;
    }

    function getUserRole(address user) public view returns (string memory) {
        require(hasBadge[user], "User has no badge");
        Role role = userRoles[user];
        if (role == Role.Starter) return "starter";
        else if (role == Role.Farmer) return "farmer";
        else return "trader";
    }
}
