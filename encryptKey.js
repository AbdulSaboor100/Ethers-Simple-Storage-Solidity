const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

const main = async () => {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  fs.writeFileSync("./key.json", encryptedKey);
};

main()
  .then(() => {})
  .catch((error) => console.log(error));
