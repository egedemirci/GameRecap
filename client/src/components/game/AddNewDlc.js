import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import GameFinder from "../../apis/GameFinder";
import { useState } from "react";

export default function AddNewDlc(game_id) {
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const sy = data.get("synopsis");
    if (sy?.length > 6000) {
      setError("You cannot enter more than 6000 characters!");
    }
    try {
      await GameFinder.post("/dlc", {
        dlc_name: data.get("name"),
        game_id: game_id.game_id,
        release_date: data.get("date"),
        synopsis: data.get("synopsis"),
      }).then((res) => {
        alert("Success! Refreshing...");
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };
  const content = (
    <>
      <Container maxWidth="sm">
        <Box component="form" sx={{ mt: 6 }} onSubmit={handleSubmit}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New DLC
          </Typography>
          <Typography variant="h6" component="h10">
            Name of the DLC
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            className="form-control"
            type="text"
          />
          <Typography variant="h6" component="h10">
            Release Date
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            name="date"
            className="form-control"
            type="date"
          />
          <Typography variant="h6" component="h10">
            Synopsis
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="synopsis"
            name="synopsis"
            className="form-control"
            type="text"
            multiline
            rows={4}
          />
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
        </Box>
      </Container>
    </>
  );
  return content;
}
