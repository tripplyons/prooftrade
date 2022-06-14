import Typography from "@mui/material/Typography"

export default function Heading({ sx={}, children }) {
  return (
    <Typography variant="h5" component="h2" gutterBottom sx={sx}>
      { children }
    </Typography>
  );
}
