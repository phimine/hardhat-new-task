const { task } = require("hardhat/config")

require("@nomicfoundation/hardhat-toolbox")
require("dotenv/config")
require("@nomicfoundation/hardhat-verify")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

const { ProxyAgent, setGlobalDispatcher } = require("undici")
const proxyAgent = new ProxyAgent("http://127.0.0.1:7890")
setGlobalDispatcher(proxyAgent)

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//     const accounts = await hre.ethers.getSigners()

//     for (const account of accounts) {
//         console.log(account.address)
//     }
// })

const SEPOLIA_RPC_URL = process.env.RPC_URL || "https://eth-sepolia"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "0xkey"
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "0xkey"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    // defaultNetwork: hardhat
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts is not needed, thanks hardhat!
            chainId: 31337,
        },
    },

    solidity: "0.8.7",

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },

    gasReporter: {
        enabled: true,
        // outputFile: "gas-report.txt",
        // noColors: true,
        // currency: "USD",
        // coinmarketcap: COINMARKETCAP_API_KEY,
        // token: "MATIC",
    },
}
