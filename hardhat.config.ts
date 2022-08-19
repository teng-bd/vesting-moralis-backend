import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';
import "hardhat-deploy-ethers";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";


task("accounts", "Prints the list of accounts", async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

export default {
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    beneficiary: {
      default: 1,
    }
  },
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
    tests: "./test",
    deploy: "./deploy"
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      inject: true,
      chainId: 1337,
      accounts: {
        mnemonic: "test test test test test test test test test test test junk", // test test test test test test test test test test test junk
      },
      tags: ["local", "test"],
      // mining: {
      //   auto: true,
      //   interval: [3000, 6000],
      // },
      deploy: ["deploy"],
    }
  },
  localhost: {
    url: "http://0.0.0.0:8545",
    allowUnlimitedContractSize: true,
    inject: true,
    chainId: 1337,
    accounts: {
      mnemonic: "test test test test test test test test test test test junk", // test test test test test test test test test test test junk
    },
    tags: ["local", "test"],
    // mining: {
    //   auto: true,
    //   interval: [3000, 6000],
    // },
    deploy: ["deploy/localhost"],
  }
}
