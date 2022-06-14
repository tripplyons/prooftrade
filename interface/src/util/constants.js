import WalletConnectProvider from "@walletconnect/web3-provider";

export const TESTNET = true;
export const PROJECT_NAME = 'Prooftrade';
export const AUTHOR = 'Tripp Lyons';
export const PROJECT_DESCRIPTION = 'A low-cost orderbook-based decentralized exchange for Ethereum';
export const CHAIN_ID = TESTNET ? 4 : 1;
export const CHAIN_NAME = TESTNET ? 'Rinkeby Testnet' : 'Ethereum';
export const INFURA_ID = '7ae44b13053c4518957aa244255446b6';
export const ETH_UNIT = TESTNET ? 'testETH' : 'ETH';
export const FILLER_CONTRACT_ADDRESS = TESTNET ? '0x' : '0x';
export const WEB3MODAL_SETTINGS = {
  network: CHAIN_ID,
  cacheProvider: true,
  theme: "dark",
  providerOptions: {
    injected: {
      display: {
        name: "Browser Extension",
        description: "Connect with the provider in your Browser"
      },
      package: null
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: INFURA_ID,
      }
    },
  }
};
export const LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/tripplyons/prooftrade"
  }
];
