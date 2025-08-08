// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    mapping(address => bool) public isRegistered;

    function registerUser() external {
        require(!isRegistered[msg.sender], "Already registered");
        isRegistered[msg.sender] = true;
    }
}
