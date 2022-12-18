import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent/CardContent";
import TextField from "@mui/material/TextField/TextField";
import GameFinder from "../apis/GameFinder";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";


export default function DlcRateCard(props) {
    
    const dlc_id = props.dlc_id
    const user_id = props.user_id
    const [textFieldRef,setReview] = useState();
    const [error, setError] = useState(null);
    const [isRated, setRated] = useState(true);
    const [rate, setRate] = useState({});
    

    function handleReviewSent()
    {
        const text = textFieldRef;

        if (!text) {
            setError("Please enter some text in the message field.");
            return;
        }
        else
        {
            setError(null)
            GameFinder.post("dlcrate", {user_id: user_id, dlc_id: dlc_id, text: text}).then(function(response) {
                if(response.status != 200) {
                  setRated(true)
                }
              })
        }
        
    }

    useEffect(() => {
        let response = GameFinder.get(`/dlcrate/?uid=${user_id}&did=${dlc_id}`)
        .then(function(response) {
            if(response.status == 200) {
            setRated(true)
            setRate(response.data.data)
            }
        })
        .catch(function(error) {
            setRated(false)
        });
        }, []);

    



  const theme = useTheme();
  return (
    <div>
        { isRated ? <Card
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
                  <Typography style={{ fontWeight: "bold", fontSize: 15 }}>Your review: </Typography>
                </Grid>
      
                <Grid item>
                  <Typography sx={{ height: 150, width: 400}}> {rate.text} </Typography>
                </Grid>
                </Grid>
            </CardContent>
          </Card> : <Card
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
              <Typography style={{ fontWeight: "bold", fontSize: 15 }} >Write review</Typography>
            </Grid>
    
            <Grid item>
              <TextField
                onChange={(v) => setReview(v.target.value) }
                style={{ textAlign: "left" }}
                sx={{ width: 450 }}
                hintText="Message Field"
                floatingLabelText="MultiLine and FloatingLabel"
                multiline
                rows={3}
              />
              {error && <Typography color="error">{error}</Typography>}
            </Grid>
            <Grid item>
                      <Button
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={handleReviewSent}
                      >
                    Send
                  </Button>
              </Grid>
            </Grid>
        </CardContent>
      </Card> }
    </div>
    
  );
}
