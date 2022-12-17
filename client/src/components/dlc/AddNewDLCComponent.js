import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import GameFinder from "../../apis/GameFinder";
import { GameContext } from "../../context/gameContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

export default function AddNewGame() {
  const [name, setName] = useState("");
  const [game_id, setGame_id] = useState();
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const { addGame } = useContext(GameContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, date);
    try {
      const response = await GameFinder.post("/dlc", {
        dlc_name: name,
        release_date: date,
        game_id: game_id,
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
            Add New Dlc
          </Typography>
          <Typography variant="h6" component="h10">
            Name of the DLC
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

          <Typography variant="h6" component="h10">
            Game ID
          </Typography>
          <TextField
            margin="normal"
            required
            value={game_id}
            onChange={(e) => setGame_id(e.target.value)}
            fullWidth
            id="game_id"
            name="game_id"
            className="form-control"
            type="text"
          />
          <Typography variant="h6" component="h10">
            Release Date
          </Typography>
          <TextField
            margin="normal"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            id="date"
            name="date"
            className="form-control"
            type="date"
          />
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
