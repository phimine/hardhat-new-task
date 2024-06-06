const { ethers, run, network } = require("hardhat")

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    const contractAddress = await simpleStorage.getAddress()
    console.log(`Contract Address is : ${contractAddress}`)

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log(network.config)
        await verify(contractAddress, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is : ${currentValue}`)

    const txResponse = await simpleStorage.store(7)
    await txResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is : ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgsParams: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
