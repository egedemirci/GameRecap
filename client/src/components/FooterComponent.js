import { Box, Typography } from "@mui/material";

export default function FooterComponent() {
  return (
    <Box sx={{ bgcolor: "#D3EDEE", gridArea: "footer" }} component="footer">
      <center>
        <img
          src="https://i.hizliresim.com/kti4lvy.png"
          height="100"
          width="100"
          alt="logo"
        />
      </center>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      ></Typography>
    </Box>
  );
}
