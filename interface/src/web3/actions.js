import { ethers } from "ethers";
import { getFillerContract } from "./getters";

export async function buy(provider) {
  const contract = await getFillerContract(provider);
  // TODO
  alert("not implemented");
}
