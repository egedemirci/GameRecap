import gameRecap from "./api/gameRecap.route.js";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json()); //For funcionality to read json
app.use(express.static(path.join(__dirname + "/../client/build")));

app.use("/api/GameRecap", gameRecap);

// After defining your routes, anything that doesn't match what's above, we want to return index.html from our built React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

//export app as a module rather than import app to access database
export default app;
