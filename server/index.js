import app from "./server.js";
import dotenv from "dotenv";

//Initialize env path
dotenv.config({
  path: "../.env",
});

app.listen(process.env.PORT || 3500, () => {
  console.log(`Server has started on port ${process.env.PORT || 3500}`);
});
