import { ethers } from "ethers";
import { CIDContract, NFTContract, DAOContract } from "../contracts";

CIDContract.on("CIDUpdated", (user, cid) => {
  console.log(`CID оновлено для ${user}: ${cid}`);
  generateScene("cid", user, cid);
});

NFTContract.on("BadgeMinted", (user, tokenId) => {
  console.log(`NFT бейдж згенеровано: ${tokenId}`);
  generateScene("nft", user, tokenId);
});

DAOContract.on("VoteCast", (user, proposalId) => {
  console.log(`Голосування: ${user} → ${proposalId}`);
  generateScene("dao", user, proposalId);
});
