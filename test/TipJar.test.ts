import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("TipJar", function () {
  //defino un elemento base para reutilizar en cada test
  async function deployTipJar() {
    const [owner, user1] = await hre.ethers.getSigners();
    const TipJar = await hre.ethers.getContractFactory("TipJar");
    const tipJar = await TipJar.deploy();
    return { tipJar, owner, user1 };
  }
//verifica que se revierta la operacion solo si quien la llama no es el owner
  describe("OnlyOwner", function () {
    it("Should revert with the right error if called from another account", async function () {
      const { tipJar, user1 } = await loadFixture(deployTipJar);
      await expect(tipJar.connect(user1).withdraw()).to.be.revertedWith(
        "Only owner can perform this action"
      );
    });
     it("The operation should not be reversed if the person executing it is the owner.", async function () {
      const { tipJar, owner } = await loadFixture(deployTipJar);
      await expect(tipJar.connect(owner).withdraw()).not.to.be.reverted;
    });
  });

  // verfica la emision de un evento cuando se recibe propina 
  // sea por la funcion tip o por la funcion receive
  describe("Event", function () {
    it("Should emit an event on reception of tip", async function () {
      const { tipJar, user1 } = await loadFixture(deployTipJar);
      const message = "hola";
      const value = ethers.parseEther("1");
      await expect(tipJar.connect(user1).tip(message, { value }))
        .to.emit(tipJar, "NewTip")
        .withArgs(user1.address, value, message);
    });
    it("Should emit an event on reception of tip using the function receive", async function () {
      const { tipJar, user1 } = await loadFixture(deployTipJar);
      const message = "transaction executed from the receive function";
      const value = ethers.parseEther("1");
      await expect(
        user1.sendTransaction({
          to: tipJar.target,
          value,
        })
      )
        .to.emit(tipJar, "NewTip")
        .withArgs(user1.address, value, message);
    });
  });

  describe("BalanceUpdate", function () {
    it("It should update the balance correctly.", async function () {
      const { tipJar, user1 } = await loadFixture(deployTipJar);
      const value = ethers.parseEther("1");
      const initBalance = await tipJar.connect(user1).getBalance();
      await user1.sendTransaction({ to: tipJar.target, value });
      const endBalance = await tipJar.connect(user1).getBalance();
      expect(endBalance).to.equal(initBalance + value)
    });
  });

})