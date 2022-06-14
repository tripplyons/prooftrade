import { ethers } from "ethers";
import FILLER_CONTRACT_ABI from "./abi/OrderFiller";
import { FILLER_CONTRACT_ADDRESS } from "../util/constants";

export async function getFillerContract(provider) {
  const contract = new ethers.Contract(
    FILLER_CONTRACT_ADDRESS,
    FILLER_CONTRACT_ABI,
    provider.getSigner()
  );
  return contract;
}
