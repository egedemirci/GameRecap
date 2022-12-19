import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import SmallCard from "../SmallCard";
import GameFinder from "../../apis/GameFinder";
import ResponsiveAppBar from "../appbarGame";
import DlcRateCard from "../DLCRateCard";
import TextField from "@mui/material/TextField/TextField";
import { useTheme } from "@mui/material/styles";


export default function IndividualDLCComponent() {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const [reviews, setReviews] = useState([]);
  const [dlc, setDLC] = useState(null);
  const theme = useTheme();


  const refreshPage = () => {
    console.log("Fresh")
    window.location.reload()
  }

  function renderReview(text, username)
  {
    return(
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
                  <Typography style={{ fontWeight: "bold", fontSize: 15 }}>{username} </Typography>
                </Grid>
      
                <Grid item>
                  <Typography sx={{ height: 150, width: 400}}> {text} </Typography>
                </Grid>
                </Grid>
            </CardContent>
          </Card>
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await GameFinder.get(`/dlc/${id}`);
      setDLC(result.data.data);
      const reviewRes = await GameFinder.put(`/dlcrate/?did=${id}`)
      setReviews(reviewRes.data.data)
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
        <Grid container spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="center" >
            <Grid item><DlcRateCard user_id={user.user_id} dlc_id={id}/> </Grid >
            <Grid item><Typography style={{ fontWeight: "bold", fontSize: 30 }}>All Reviews</Typography></Grid >
            <Grid item><Stack>
            <div>
      {reviews.map(review => (
        <div key={review.user_id}>
          {renderReview(review.text, review.username)}
        </div>
      ))}
    </div>
              </Stack></Grid>
          </Grid >
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
