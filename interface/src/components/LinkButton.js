import { Button } from '@mui/material';
import Link from './Link';

export default function LinkButton({href, children, variant = 'contained'}) {
  return (
    <Button variant={variant} component={Link} noLinkStyle href={href}>
      {children}
    </Button>
  );
}
