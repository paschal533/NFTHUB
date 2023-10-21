const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nFTMarketplace = await NFTMarketplace.deploy({ gasLimit: "0x1000000" });

  await nFTMarketplace.waitForDeployment();

  console.log("NFTMarketplace deployed to:", await nFTMarketplace.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
