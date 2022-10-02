require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers")

/** @type import('hardhat/config').HardhatUserConfig */
const { API_URL, PRIVATE_KEY, GOERLI_API_KEY } = process.env;
module.exports = {
  solidity: {
    compilers: [
       {
         version: "0.8.17",
         settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
         } 
       }
     ]
  },
  defaultNetwork: "hardhat",
   etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: GOERLI_API_KEY
  },
   networks: {
      hardhat: {
        blockGasLimit: 3000000000000,
      },
      goerli: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },

};
