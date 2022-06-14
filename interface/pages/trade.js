import * as React from 'react';
import BasicPageContainer from '../src/components/BasicPageContainer';
import { PROJECT_NAME } from '../src/util/constants';
import Heading from '../src/components/Heading';
import Subheading from '../src/components/Subheading';
import ConnectWallet from '../src/components/ConnectWallet';
import { Card, CardContent } from '@mui/material';
import TakerInterface from '../src/components/TakerInterface';

export default function Trade() {
  return (
    <BasicPageContainer>
      <Heading>Trade on {PROJECT_NAME}</Heading>
      <Subheading>Connect Wallet</Subheading>
      <Card sx={{ minWidth: 275, mt: 2 }}>
        <CardContent>
          <ConnectWallet />
        </CardContent>
      </Card>
      <Subheading>Take Offer</Subheading>
      <Card sx={{ minWidth: 275, mt: 2 }}>
        <CardContent>
          <TakerInterface />
        </CardContent>
      </Card>
    </BasicPageContainer>
  );
}
