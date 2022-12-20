import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import GameFinder from "../../apis/GameFinder";
import { useState } from "react";

export default function AddNewPubStudio() {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await GameFinder.post("/publishingstudios", {
        studio_name: name,
      });
      alert("Success! Refreshing...");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const content = (
    <>
      <Container maxWidth="sm">
        <Box component="form" sx={{ mt: 6 }} onSubmit={handleSubmit}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Publishing Studio
          </Typography>
          <Typography variant="h6" component="h10">
            Name of the Publishing Studio
          </Typography>
          <TextField
            margin="normal"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            id="name"
            name="name"
            className="form-control"
            type="text"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add To Database
          </Button>
        </Box>
      </Container>
    </>
  );
  return content;
}
