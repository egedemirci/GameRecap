import app from "./server.js";
import dotenv from "dotenv";

//Initialize env path
dotenv.config({
  path: "../.env",
});

//const __dirname = "wingman"
//const API_URL =
//process.env.NODE_ENV === "production"
//? "YOUR_APP_URL"
//: "http://localhost:5000";
// Serve static files from the React frontend app

app.listen(process.env.PORT || 3500, () => {
  console.log(`Server has started on port ${process.env.PORT || 3500}`);
});
