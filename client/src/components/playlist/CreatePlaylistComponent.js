import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect, useContext } from "react";
import GameFinder from "../../apis/GameFinder";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../context/userContext";

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
];

export default function CreatePlaylistComponent() {
  const { user } = useContext(UsersContext);
  const [games, setGames] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [selGames, setSelGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getGames = async () => {
      await GameFinder.get("/games").then((response) => {
        setGames(response.data.data.games);
      });
    };
    getGames();
  }, [setGames]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let game_ids = [];
    for (let i = 0; i < selGames.length; i++) {
      game_ids.push(selGames[i].game_id);
    }
    if (game_ids.length === 0) {
      alert("Please select at least one game");
      return;
    }
    try {
      await GameFinder.post("/playlist", {
        playlist_name: playlistName,
        game_ids: game_ids,
        user_id: user.user_id,
      }).then((r) => {
        alert("Success! Redirecting to your profile...");
        navigate("/profile");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box height="100vh" display="flex" flexDirection="column">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ mt: 20 }}
        >
          Create a Playlist
        </Typography>
        <Container maxWidth="md" component="main">
          <Typography variant="h6" component="h2" gutterBottom>
            Playlist Name
          </Typography>
          <TextField
            fullWidth
            autoFocus
            value={playlistName}
            onChange={(e) => setPlaylistName(e.currentTarget.value)}
          />
          <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
            Select Games
          </Typography>
          <Autocomplete
            multiple
            fullWidth
            id="tags-outlined"
            options={games}
            getOptionLabel={(option) => option.game_name}
            filterSelectedOptions
            onChange={(event, newValue) => {
              setSelGames(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Game" />
            )}
          />
          <Box textAlign="center">
            <Button
              variant="contained"
              sx={{ mt: 4, align: "center" }}
              onClick={handleSubmit}
            >
              Create Playlist
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
