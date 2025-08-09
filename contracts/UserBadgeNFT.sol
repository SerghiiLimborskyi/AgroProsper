import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract UserRegistry is ERC721URIStorage {
    uint256 public badgeCounter;

    function mintBadge(address user, string memory tokenURI) public onlyAdmin {
        require(isUser(user), "Not registered");
        _mint(user, badgeCounter);
        _setTokenURI(badgeCounter, tokenURI);
        badgeCounter++;
    }
}
