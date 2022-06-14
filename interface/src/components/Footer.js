import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { LINKS, AUTHOR } from '../util/constants';
import { Grid } from '@mui/material';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 6}}>
      {'Copyright © '}
      <MuiLink color="inherit" href="/">
        { AUTHOR }
      </MuiLink>{' '}
      {new Date().getFullYear()}.
      <Grid container justifyContent="center" alignItems="center">
        {
          LINKS.map(({ name, url }, i) => (
            <Grid item key={i}>
              <MuiLink color="inherit" href={url}>
                {name}
              </MuiLink>
            </Grid>
          ))
        }
      </Grid>
    </Typography>
  );
}
