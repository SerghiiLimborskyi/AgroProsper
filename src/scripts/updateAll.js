require("dotenv").config();
const fs = require("fs");
const path = require("path");

const badgeFiles = ["starter.json", "farmer.json", "trader.json"];
const contractPath = path.join(__dirname, "../contracts/UserBadgeNFT.sol");

badgeFiles.forEach(file => {
  const metadata = JSON.parse(fs.readFileSync(path.join(__dirname, "../contracts", file)));
  const cid = metadata.image.split("/")[2]; // assuming IPFS format
  const badgeType = file.split(".")[0];
  const regex = new RegExp(`(badgeCIDs\

\["${badgeType}"\\]

\\s*=\\s*")[^"]+(";)`);
  let contractCode = fs.readFileSync(contractPath, "utf8");
  contractCode = contractCode.replace(regex, `$1${cid}$2`);
  fs.writeFileSync(contractPath, contractCode);
});
