// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AGTToken is ERC20Votes, Ownable {
    constructor()
        ERC20("AgroToken", "AGT")
        ERC20Permit("AgroToken")
    {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    // ✅ Mint — тільки власник (DAO або адмін)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    // ✅ Burn — дозволено власнику
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
        emit TokensBurned(from, amount);
    }

    // ✅ Делегування голосу
    function delegateVotes(address delegatee) external {
        _delegate(delegatee);
        emit VotesDelegated(msg.sender, delegatee);
    }

    // ✅ Події для фронтенду
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    event VotesDelegated(address indexed from, address indexed to);
}
