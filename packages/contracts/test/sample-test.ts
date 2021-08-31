import { expect } from "chai";
import { ethers } from "hardhat";

import { Greeter } from "../typechain";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const GreeterContract = await ethers.getContractFactory("Greeter");
    const greeter = await GreeterContract.deploy("Hello, world!");
    const greeterInstance = (await greeter.deployed()) as Greeter;

    expect(await greeterInstance.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeterInstance.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeterInstance.greet()).to.equal("Hola, mundo!");
  });
});
