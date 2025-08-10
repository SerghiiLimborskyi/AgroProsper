// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UserBadgeNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    mapping(string => string) public badgeURIs;

    constructor() ERC721("UserBadge", "UBADGE") {
        tokenCounter = 0;

        // 🔖 URI для типів бейджів
        badgeURIs["Starter"] = "ipfs://Qm...starter";
        badgeURIs["Farmer"] = "ipfs://Qm...farmer";
        badgeURIs["Trader"] = "ipfs://Qm...trader";
    }

    function updateCID(string memory newURI) public onlyOwner {
    badgeURIs["Starter"] = newURI;
}

    function mintBadge(address to, string memory badgeType) external onlyOwner {
        require(bytes(badgeURIs[badgeType]).length > 0, "Invalid badge type");

        uint256 newTokenId = tokenCounter;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, badgeURIs[badgeType]);

        tokenCounter++;
    }

    function setBadgeURI(string memory badgeType, string memory uri) external onlyOwner {
        badgeURIs[badgeType] = uri;
    }
}
