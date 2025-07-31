// TopFarmerSBT.tact
import { Address, Cell, Contract, Sender, StateInit, beginCell } from '@ton/core';

contract TopFarmerSBT {
  // 🧩 Структура токена
  struct Token {
    owner: Address,
    metadata: string
  }

  // 📦 Зберігаємо токени
  tokens: map<Address, Token> = map();

  // 🛠 Mint новий токен
  public function mint(to: Address, metadata: string) {
    if (tokens.exists(to)) {
      throw("Token already minted for this address");
    }
    tokens.set(to, { owner: to, metadata });
  }

  // 🔍 Отримати метадані
  public function getMetadata(addr: Address): string {
    if (!tokens.exists(addr)) {
      throw("No token for this address");
    }
    return tokens.get(addr).metadata;
  }

  // 🚫 Заборонити передачу токена
  public function transfer(from: Address, to: Address) {
    throw("SBT cannot be transferred");
  }
}
