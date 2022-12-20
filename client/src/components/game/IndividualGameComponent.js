import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SmallCard from "../SmallCard";
import GameFinder from "../../apis/GameFinder";
import ResponsiveAppBar from "../appbarGame";
import RateCard from "../RateCard";
import TextField from "@mui/material/TextField/TextField";
import { useTheme } from "@mui/material/styles";
import { UsersContext } from "../../context/userContext";
import AddNewDlc from "./AddNewDlc";
import { Container, Box } from "@mui/system";
import Button from "@mui/material/Button";

export default function IndividualGameComponent() {
  const { id } = useParams();
  const { user } = useContext(UsersContext);
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const theme = useTheme();

  const refreshPage = () => {
    console.log("Fresh");
    window.location.reload();
  };

  function renderReview(text, username) {
    return (
      <Card
        sx={{ height: 250, width: 500 }}
        style={{ backgroundColor: theme.palette.secondary.main }}
      >
        <CardContent>
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography style={{ fontWeight: "bold", fontSize: 15 }}>
                {username}{" "}
              </Typography>
            </Grid>

            <Grid item>
              <Typography sx={{ height: 150, width: 400 }}> {text} </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await GameFinder.get(`/games/${id}`);
      setGame(result.data.data);
      const reviewRes = await GameFinder.put(`/rate/?gid=${id}`);
      setReviews(reviewRes.data.data);
    };
    fetchData();
  }, [id]);

  console.log(game);
  return game !== null ? (
    <>
      <ResponsiveAppBar />
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item mr={2} mt={2} xs={3} md={0} lg={12}>
          <center>
            <center>
              <Avatar
                src="https://i.hizliresim.com/kti4lvy.png"
                sx={{ width: 150, height: 150 }}
              />
            </center>
            <Typography
              variant="h3"
              color="#1d3557"
              fontWeight="600"
              sx={{ mt: 4 }}
            >
              {game.game_name}
            </Typography>
          </center>
        </Grid>
        <Grid item ml={2} mt={0} xs={12} sm={6} md={4} lg={2.5}>
          <SmallCard title="Release Date" subtitle={game.release_date} />
        </Grid>
        <Grid item xs={12} mt={0} sm={6} md={4} lg={3}>
          <SmallCard title="Languages" subtitle={game.lang_name} />
        </Grid>
        <Grid item xs={12} mt={0} sm={6} md={4} lg={3}>
          <SmallCard title="On Stores" subtitle={game.store_name} />
        </Grid>
        <Grid item xs={12} mt={0} sm={6} md={4} lg={3}>
          <SmallCard
            title="Offered In Services"
            subtitle={game.service_names}
          />
        </Grid>
        <Grid
          item
          md={8}
          sx={{ display: { sm: "none", md: "block", lg: "none" } }}
        />
        <Grid item ml={2} mt={0} xs={12} sm={6} md={4} lg={2.5}>
          <SmallCard title="DLCs" subtitle={game.dlc_name} />
        </Grid>
        <Grid item xs={12} mt={0} sm={6} md={4} lg={3}>
          <SmallCard title="By Development Studios" subtitle={game.ds_name} />
        </Grid>
        <Grid item xs={12} mt={0} sm={6} md={4} lg={3}>
          <SmallCard title="Categories" subtitle={game.category_name} />
        </Grid>
        <Grid item xs={12} mt={0} sm={6} md={4} lg={3}>
          <SmallCard title="On Platforms" subtitle={game.platform_name} />
        </Grid>
        <Grid item xs={1} sx={{ mb: 6 }} />
        <Grid item xs={10} align="center" sx={{ mb: 6 }}>
          <SmallCard title="Synopsis" subtitle={game.synopsis} />
        </Grid>
        <Grid item xs={1} sx={{ mb: 6 }} />
        {game.merchandise_link !== null ? (
          <>
            <Grid item xs={1} sx={{ mb: 4 }} />
            <Grid item xs={10} align="center" sx={{ mb: 4, mt: -6 }}>
              <Button href={game.merchandise_link} variant="contained">
                Merchandise
              </Button>
            </Grid>
            <Grid item xs={1} sx={{ mb: 4 }} />
          </>
        ) : null}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {user.role === "admin" ? (
          <AddNewDlc game_id={id} />
        ) : (
          <Grid
            container
            spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item>
              <RateCard
                user_id={user.user_id}
                game_id={id}
                refreshPage={refreshPage}
              />{" "}
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: "bold", fontSize: 30 }}>
                All Reviews
              </Typography>
            </Grid>
            <Grid item sx={{ mb: 4 }}>
              <Stack>
                <div>
                  {reviews.map((review) => (
                    <div key={review.user_id}>
                      {renderReview(review.text, review.username)}
                    </div>
                  ))}
                </div>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  ) : null;
}
