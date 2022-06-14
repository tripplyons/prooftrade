import { Button, Typography } from "@mui/material";
import { CHAIN_NAME, CHAIN_ID } from "../util/constants";
import { formatAddress } from "../util/formatting";
import { useEthersModal } from "use-ethers-modal";

export default function ConnectWallet() {
  const { ready, chainId, connect, disconnect, switchNetwork, account } = useEthersModal();

  return (
    <div>
      {ready ? (
        <div>
          Connected wallet: {formatAddress(account)}
          {(
            chainId === CHAIN_ID ? (
              <Button fullWidth variant="outlined" sx={{mt: 2}}
                onClick={disconnect}
              >
                Disconnect
              </Button>
            ) : (
              <Button fullWidth color="error" variant="contained" sx={{mt: 2}}
                onClick={() => switchNetwork(CHAIN_ID)}
              >
                Switch Network to {CHAIN_NAME}
              </Button>
            )
          )}
        </div>
      ) : (
        <div>
          Connected wallet: None
          <Button fullWidth variant="contained" sx={{mt: 2}} onClick={connect}>
            Connect Wallet
          </Button>
        </div>
      )}
    </div>
  );
}
