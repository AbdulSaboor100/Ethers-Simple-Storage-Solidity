const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  //   const encryptedKey = fs.readFileSync("./key.json", "utf8");
  //   let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //     encryptedKey,
  //     process.env.PRIVATE_KEY_PASSWORD
  //   );
  //   wallet = wallet.connect(provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying contract please wait ....");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  //   console.log(contract);
  console.log(`Contract deployed to ${contract.address}`);
  const currentFavoriteNumber = await contract.retreive();
  console.log(
    `Current Favorite Number Is ${currentFavoriteNumber?.toString()}`
  );
  const transactionResponse = await contract.store("55");
  await transactionResponse.wait(1);
  const updateFavoriteNumber = await contract.retreive();
  console.log(`Current Favorite Number Is ${updateFavoriteNumber?.toString()}`);
};

main()
  .then(() => {})
  .catch((error) => console.log(error));
