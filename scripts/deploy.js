// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.


const { ethers } = require("ethers");

const destruct_ABI = require("../artifacts/contracts/destruct.sol/destruct.json")
const url  = "http://127.0.0.1:8545";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(url);
  const signer = provider.getSigner(0, provider);
  const Destruct = new ethers.ContractFactory(destruct_ABI.abi, destruct_ABI.bytecode, signer);
  const destruct  = await Destruct.deploy();

  //const Destruct = await hre.ethers.getContractFactory("destruct");
  //const destruct = await Destruct.deploy();

  //await destruct.deployed();

  console.log("Destruct address(you should replace this address to destruct address in attack.sol file):", destruct.address)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
