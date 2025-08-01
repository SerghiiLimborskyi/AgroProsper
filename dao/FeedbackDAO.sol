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
