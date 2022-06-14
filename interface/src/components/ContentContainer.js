import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function ContentContainer({ children }) {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        {children}
      </Box>
    </Container>
  );
}
