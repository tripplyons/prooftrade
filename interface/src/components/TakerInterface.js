import { Button, Typography, Grid } from '@mui/material';
import { useEthersModal } from 'use-ethers-modal';
import { formatBalance } from '../util/formatting';
import { buy } from '../web3/actions';
import { ETH_UNIT, CHAIN_ID } from '../util/constants';

export default function TakerInterface() {
  const { provider, ready, balance, chainId } = useEthersModal();

  return (
    <div>
      {ready && chainId === CHAIN_ID ? (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              Wallet balance: {formatBalance(balance)} {ETH_UNIT}
            </Grid>
            <Grid item xs={12} sm={6}>
              Price: (TODO)
            </Grid>
          </Grid>
          <Button fullWidth variant='contained' sx={{mt: 2}} onClick={() => {
            buy(provider)
          }}>
            Buy
          </Button>
        </div>
      ) : (
        <div>
          Your wallet is not connected.
        </div>
      )}
    </div>
  );
}
