import PropTypes from "prop-types";
import { Grid, Stack, Typography } from "@mui/material";
import MainCard from "./MainCard";

const SmallCard = ({ title, subtitle }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}>
      <Typography variant="h6" color="#a8dadc" font fontWeight="bold">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h6" color="#F1FAEE" font fontWeight="light">
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  </MainCard>
);

SmallCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
};

SmallCard.defaultProps = {
  color: "primary",
};

export default SmallCard;
