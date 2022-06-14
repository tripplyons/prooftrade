import { PROJECT_DESCRIPTION, PROJECT_NAME } from '../util/constants';
import Heading from './Heading';
import Subheading from './Subheading';
import { Typography } from '@mui/material';
import Link from './Link';

export default function FAQ() {
  return (
    <div>
      <Heading>Frequently Asked Questions</Heading>
      <Subheading>What is {PROJECT_NAME}?</Subheading>
      <Typography sx={{mt: 2}}>
        {PROJECT_DESCRIPTION}
      </Typography>
      <Subheading>How do I use {PROJECT_NAME}?</Subheading>
      <Typography sx={{mt: 2}}>
        You can use {PROJECT_NAME} on the <Link href="/trade">trade page</Link>.
      </Typography>
    </div>
  );
}