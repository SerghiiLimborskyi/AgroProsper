// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract UserRegistry {
    address public owner;
    IERC20 public token;

    struct User {
        string name;
        string email;
        bool isRegistered;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed user, string name, string email);
    event RewardSent(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);
    }

    function register(string memory _name, string memory _email) public {
        require(!users[msg.sender].isRegistered, "Already registered");
        users[msg.sender] = User(_name, _email, true);
        emit UserRegistered(msg.sender, _name, _email);
    }

    function rewardUser(address _user) public onlyOwner {
        require(users[_user].isRegistered, "Not registered");
        uint256 rewardAmount = 100 * 10**18;
        require(token.transfer(_user, rewardAmount), "Transfer failed");
        emit RewardSent(_user, rewardAmount);
    }

    function isUser(address _addr) public view returns (bool) {
        return users[_addr].isRegistered;
    }
}
