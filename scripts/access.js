const { ethers } = require("hardhat");

async function main() {
  const [user] = await ethers.getSigners();
  const data = "0x0fdb11cf"; // function selector of `fetchPrice()`

  const MockOracle = await ethers.getContractFactory("MockOracle");
  const oracle = await MockOracle.deploy();
  await oracle.deployed();

  console.log(`MockOracle contract deployed at ${oracle.address}`);

  const BasicCaller = await ethers.getContractFactory("BasicCaller");
  const caller = await BasicCaller.deploy(oracle.address);
  await caller.deployed();

  console.log(`BasicCaller contract deployed at ${caller.address}`);

  const accessTrx = {
    from: user.address,
    to: caller.address,
    data: data,
    value: 0,
    accessList: [
      {
        address: oracle.address,
        storageKeys: [
          "0x0000000000000000000000000000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000000000000000000000000001",
        ],
      },
    ],
  };

  const classicTrx = {
    from: user.address,
    to: caller.address,
    data: data,
    value: 0,
  };

  console.log("******** Gas cost comparison ********");
  const accessTrxCall = await user.sendTransaction(accessTrx);

  const receipt = await accessTrxCall.wait();

  console.log(
    `Initial transaction with access list costs: ${receipt.gasUsed.toString()}`
  );

  const classicTrxCall = await user.sendTransaction(classicTrx);

  const classicReceipt = await classicTrxCall.wait();

  console.log(
    `Initial transaction without access list costs: ${classicReceipt.gasUsed.toString()}`
  );

  const accessTrxCall2 = await user.sendTransaction(accessTrx);

  const receipt2 = await accessTrxCall2.wait();

  console.log(
    `2nd same transaction with access list costs: ${receipt2.gasUsed.toString()}`
  );

  const classicTrxCall2 = await user.sendTransaction(classicTrx);

  const classicReceipt2 = await classicTrxCall2.wait();

  console.log(
    `2nd same transaction without access list costs: ${classicReceipt2.gasUsed.toString()}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
