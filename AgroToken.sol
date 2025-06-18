// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AgroToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("AgroToken", "AGT") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
AgroToken/
├── contracts/
│   └── AgroToken.sol         # Головний смарт-контракт ERC-20
├── scripts/
│   └── deploy.js             # Скрипт розгортання через Hardhat
├── assets/
│   └── agro-logo.png         # Логотип токена (опц.)
├── .env.example              # Зразок конфігу з токеном і газ-лімітом
├── README.md                 # Інструкція для інвестора/власника токена
├── hardhat.config.js         # Налаштування для розгортання
└── package.json              # Залежності (`openzeppelin`, `hardhat`)
