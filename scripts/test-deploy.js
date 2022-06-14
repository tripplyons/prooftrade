const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const TestERC20 = await ethers.getContractFactory("TestERC20");
  const OrderFiller = await ethers.getContractFactory("OrderFiller");

  const testToken0 = await TestERC20.deploy("Test Token 0", "TEST0");
  await testToken0.deployed();
  const testToken1 = await TestERC20.deploy("Test Token 1", "TEST1");
  await testToken1.deployed();
  const orderFiller = await OrderFiller.deploy(testToken0.address, testToken1.address);
  await orderFiller.deployed();


  console.log("TestERC20 (TEST0) address:", testToken0.address);
  console.log("TestERC20 (TEST1) address:", testToken1.address);
  console.log("OrderFiller address:", orderFiller.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
