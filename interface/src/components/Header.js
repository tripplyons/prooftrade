import Typography from '@mui/material/Typography';
import Link from './Link';
import { PROJECT_NAME } from '../util/constants';
import { Grid } from '@mui/material';
import LinkButton from './LinkButton';

export default function Header() {
  return (
    <Grid container justifyContent="space-between" alignItems="center" sx={{mb: 4}}>
      <Grid item xs="auto">
        <Link href="/">
          <Typography variant="h4" component="h1">
            { PROJECT_NAME }
          </Typography>
        </Link>
      </Grid>
      <Grid item xs="auto">
        <Grid container justifyContent="flex-end" alignItems="center" spacing={2}>
          <Grid item>
            <LinkButton variant="text" href="/trade">
              Trade
            </LinkButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
