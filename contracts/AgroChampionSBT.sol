// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AgroChampionSBT is ERC721URIStorage, Ownable {
    uint256 public tokenCount;

    constructor() ERC721("AgroChampion", "AGTCH") {}

    function mintSBT(address to, string memory tokenURI) external onlyOwner {
        tokenCount++;
        _mint(to, tokenCount);
        _setTokenURI(tokenCount, tokenURI);
    }

    function _beforeTokenTransfer(
        address from, address to, uint256 tokenId, uint256
    ) internal override {
        require(from == address(0), "SBT is non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, 1);
    }
}
