// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    enum Role { Farmer, Advertiser, Analyst, Donor }

    struct User {
        address wallet;
        Role role;
        bool registered;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed wallet, Role role);

    function registerUser(Role _role) external {
        require(!users[msg.sender].registered, "Already registered");
        users[msg.sender] = User(msg.sender, _role, true);
        emit UserRegistered(msg.sender, _role);
    }

    function getUser(address _wallet) external view returns (User memory) {
        return users[_wallet];
    }
}
