import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import SmallCard from "./SmallCard";
import GameFinder from "../apis/GameFinder";
import ResponsiveAppBar from "./appbarGame";
import RateCard from "./RateCard";

export default function IndividualGameComponent() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [game, setGame] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await GameFinder.get(`/games/${id}`);
      setGame(result.data.data);
    };
    fetchData();
  }, [id]);
  return game !== null ? (
    <>
      <ResponsiveAppBar />
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item mr={2} xs={3} md={0} lg={12}>
          <center>
            <Typography
              variant="h3"
              color="#A99985"
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
        <Grid
          item
          md={8}
          sx={{ display: { sm: "none", md: "block", lg: "none" } }}
        />
        <Grid item xs={1} />
        <Grid item xs={5} align="center">
          <SmallCard title="Synopsis" subtitle={game.synopsis} />
        </Grid>
        <Grid item xs={5} align="center">
          <RateCard user_id={user.user_id} game_id={id} />
        </Grid>
        <Grid item xs={1} />
        <Grid
          item
          md={8}
          sx={{ display: { sm: "none", md: "block", lg: "none" } }}
        />
      </Grid>
    </>
  ) : null;
}
