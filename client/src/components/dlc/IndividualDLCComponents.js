import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Grid, Typography } from "@mui/material";
import SmallCard from "../SmallCard";
import GameFinder from "../../apis/GameFinder";
import ResponsiveAppBar from "../appbarGame";
import DlcRateCard from "../DLCRateCard";

export default function IndividualDLCComponent() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [dlc, setDLC] = useState(null);

  const refreshPage = () => {
    console.log("Fresh")
    window.location.reload()
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await GameFinder.get(`/dlc/${id}`);
      console.log(result)
      setDLC(result.data.data);
    };
    fetchData();
  }, [id]);
  return dlc !== null ? (
    <>
      <ResponsiveAppBar />
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item mr={2} mt = {2} xs={3} md={0} lg={12}>
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
              {dlc.dlc_name}
            </Typography>
          </center>
        </Grid>
        <Grid item ml={3} mt={0} xs={12} sm={6} md={4} lg={5.5}>
          <SmallCard title="Release Date" subtitle={dlc.release_date} />
        </Grid>

        <Grid item xs={12} mt={0} sm={6} md={4} lg={6}>
          <SmallCard title="Game Name" subtitle={dlc.game_name,"Steam"} />
        </Grid>
<center> 
        <Grid item xs={10} mt={4} sm={6} lg = {11} align="center">
          <SmallCard title="Synopsis" subtitle={dlc.synopsis, "In God of War, players control Kratos, a Spartan warrior who is sent by the Greek gods to kill Ares, the god of war. As the story progresses, Kratos is revealed to be Ares’ former servant, who had been tricked into killing his own family and is haunted by terrible nightmares. Armed with the Blades of Chaos, a weapon made out of two daggers attached to chains, Kratos rumbles through ancient Athens and other locations on a murderous quest to terminate the rogue god. Action in God of War is viewed from the third person, and advanced movements such as running, jumping, climbing, and swimming are similar to those in the Tomb Raider series, another adventure-game series with strong platform-game characteristics. Some of Kratos’s foes can be killed only by combinations of magic and physical attacks, making combat more reliant on skill. "} />
        </Grid></center>
        <Grid item xs={5} md = {3} align="center">
          {<DlcRateCard user_id={user.user_id} dlc_id={id} /> }
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
