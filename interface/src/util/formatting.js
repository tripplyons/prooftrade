import { ethers } from "ethers";

export function formatAddress(address) {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

export function formatBalance(balance) {
  let fullString = ethers.utils.formatEther(balance);
  let fixedString = parseFloat(fullString).toFixed(2);
  return fixedString;
}
