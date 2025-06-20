// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title AgroBadge – Soulbound Token для DAO/Badge-ідентифікації
/// @author Copilot

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AgroBadge is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;
    mapping(uint256 => bool) private _isSoulbound;

    constructor() ERC721("AgroBadge", "AGB") {
        tokenCounter = 1;
    }

    function mint(address recipient, string memory tokenURI) public onlyOwner {
        uint256 tokenId = tokenCounter;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _isSoulbound[tokenId] = true;
        tokenCounter += 1;
    }

    function transferFrom(address, address, uint256) public pure override {
        revert("Soulbound: This token is non-transferable");
    }

    function safeTransferFrom(address, address, uint256) public pure override {
        revert("Soulbound: This token is non-transferable");
    }

    function safeTransferFrom(address, address, uint256, bytes memory) public pure override {
        revert("Soulbound: This token is non-transferable");
    }
}
