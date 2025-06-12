import { ethers } from "hardhat";
import TipJarABI from "../artifacts/contracts/TipJar.sol/TipJar.json";
import "dotenv/config";

const { ALCHEMY_API_KEY, SEPOLIA_PRIVATE_KEY } = process.env;
const TIPJAR_ADRRESS = "0xa08152b2733695aaA63Ad14D76FA1FD2509A4719";
const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
);
// en esta linea conecta a metamask
const wallet = new ethers.Wallet(`${SEPOLIA_PRIVATE_KEY}`, provider);

const tipJarContract = new ethers.Contract(
  TIPJAR_ADRRESS,
  TipJarABI.abi,
  wallet
);

const tip = async (message: string) => {
  try {
    const value = ethers.parseEther("0.01");
    const txTip = await tipJarContract.tip(message, { value });
    const response = await txTip.wait();
    console.log(response);
    console.log(`${ethers.formatEther(value)} depositado exitosamente`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getBalance = async () => {
  try {
    const balance = await tipJarContract.getBalance();
    console.log("Balance: " + ethers.formatEther(balance));
    return balance;
  } catch (error) {
    console.log(error);
  }
};

const withdraw = async () => {
  try {
    const txWitdraw = await tipJarContract.withdraw();
    const response = await txWitdraw.wait();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const tipHistory = async () => {
  try {
    const response = await tipJarContract.tipHistory(0);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const main = async () => {
  await tip("Hola Mundo");
  //await getBalance();
  // await withdraw();
  //await tipHistory();

};

main();
