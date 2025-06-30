contract TopFarmerSBT {
  address owner;
  map<address, bool> minted;

  init(address _owner) {
    owner = _owner;
  }

  receive("mint", address to) {
    require(!minted[to], "Already minted");

    // ⚠️ Тут вставляється логіка NFT/SBT мінтингу (Jetton, NFT standard)
    // Для спрощення — просто помічаємо, що адреса отримала бейдж
    minted[to] = true;

    send(to, 1_000_000); // Надішли символічно 0.001 TON
  }

  receive("get_status", address who) returns (bool) {
    return minted[who] || false;
  }
}
