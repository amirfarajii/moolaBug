require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks:{
    hardhat: {
      forking: {
        url: "http://127.0.0.1:8545"
      }
    }
  }
};
