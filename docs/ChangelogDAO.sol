// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChangelogDAO {
    address public owner;

    struct Version {
        string version;
        string date;
        string[] changes;
    }

    Version[] public versions;

    modifier onlyOwner() {
        require(msg.sender == owner, "⛔ Тільки адміністратор");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function approveVersion(string memory _version, string memory _date, string[] memory _changes) public onlyOwner {
        versions.push(Version(_version, _date, _changes));
    }

    function getVersion(uint index) public view returns (string memory, string memory, string[] memory) {
        Version storage v = versions[index];
        return (v.version, v.date, v.changes);
    }

    function totalVersions() public view returns (uint) {
        return versions.length;
    }
}
