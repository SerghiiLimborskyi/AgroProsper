// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

const contractABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "submitFeedback",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllFeedbacks",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct FeedbackDAO.Feedback[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];


contract FeedbackDAO {
    struct Feedback {
        address user;
        string message;
        uint256 timestamp;
    }

    Feedback[] public feedbacks;

    event FeedbackSubmitted(address indexed user, string message, uint256 timestamp);

    function submitFeedback(string memory _message) public {
        feedbacks.push(Feedback(msg.sender, _message, block.timestamp));
        emit FeedbackSubmitted(msg.sender, _message, block.timestamp);
    }

    function getAllFeedbacks() public view returns (Feedback[] memory) {
        return feedbacks;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgroFeedbackDAO {
    struct Feedback {
        address sender;
        string name;
        string message;
        uint8 vote; // 1–5
        uint256 timestamp;
    }

    Feedback[] public feedbacks;

    event FeedbackSubmitted(address indexed sender, string name, uint8 vote);

    function submitFeedback(string memory name, string memory message, uint8 vote) public {
        require(vote >= 1 && vote <= 5, "Оцінка має бути від 1 до 5");

        feedbacks.push(Feedback({
            sender: msg.sender,
            name: name,
            message: message,
            vote: vote,
            timestamp: block.timestamp
        }));

        emit FeedbackSubmitted(msg.sender, name, vote);
    }

    function getFeedback(uint index) public view returns (
        address sender,
        string memory name,
        string memory message,
        uint8 vote,
        uint256 timestamp
    ) {
        require(index < feedbacks.length, "Невірний індекс");
        Feedback memory fb = feedbacks[index];
        return (fb.sender, fb.name, fb.message, fb.vote, fb.timestamp);
    }

    function totalFeedbacks() public view returns (uint) {
        return feedbacks.length;
    }
}
