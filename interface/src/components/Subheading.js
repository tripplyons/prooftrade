import Typography from "@mui/material/Typography"

export default function Subheading({ sx={mt: 4}, children }) {
  return (
    <Typography variant="h6" component="h3" gutterBottom sx={sx}>
      { children }
    </Typography>
  );
}
