// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserRegistry {
    struct User {
        string name;
        string email;
    }

    mapping(string => User) private users;
    mapping(string => bool) private registeredEmails;

    function registerUser(string memory name, string memory email) public {
        require(!registeredEmails[email], "User already registered");
        users[email] = User(name, email);
        registeredEmails[email] = true;
    }

    function isUserRegistered(string memory email) public view returns (bool) {
        return registeredEmails[email];
    }
}
