const fs = require("fs");
//require("@nomiclabs/hardhat-waffle");
//require("@nomiclabs/hardhat-etherscan");
require("@nomicfoundation/hardhat-toolbox");

const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mantleTestnet: {
      url: "https://rpc.testnet.mantle.xyz/",
      chainId: 5001,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
    customChains: [
      {
          network: "mantleTest",
          chainId: 5001,
          urls: {
          apiURL: "https://explorer.testnet.mantle.xyz/api",
          browserURL: "https://explorer.testnet.mantle.xyz"
          }
      }
  ]
  },
};
