require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "local",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/CJ0p2QdZRojuoMvpsiQmMKiRojJXSGvP",
      accounts: ['8bc77c4f96001d3077addb8c478772146618281f58e39c19e165fa75d793563d'],
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/5ARhjf605RhTL4Umk6keHUxzUu9yI9jC",
      accounts: ['8bc77c4f96001d3077addb8c478772146618281f58e39c19e165fa75d793563d'],
      gas: 2100000,
      gasPrice: 8000000000,
      blockGasLimit: 10000000,
    },
    local: {
      url: "http://127.0.01:8545",
      gas: 2100000,
      gasPrice: 8000000000,
      blockGasLimit: 10000000,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
