import { ethers } from "ethers";
import UserRegistryABI from "../abi/UserRegistry.json";

const contractAddress = "0xYourContractAddress";

const registerUser = async (name, email) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, UserRegistryABI, signer);

  try {
    const tx = await contract.register(name, email);
    await tx.wait();
    alert("Реєстрація успішна в DAO!");
  } catch (err) {
    console.error(err);
    alert("Помилка реєстрації");
  }
};
