import express from "express";
import gameController from "./gameController.js";

//Api calls are done through uri and router routes uri correct functions
//get request send through uri > router makes correct controllerCall > controller makes DBOcall > DBO returns results from db to controller > controller adds json to response of the request
const router = express.Router()

router.use(express.json())

//tell a route to look for a GET request on the root "/" URL and return some JSON:
router.route("/test").get((req, res) => {
  res.json({ info: 'You request to GameRecap has been received!' })
})

router.route("/games")
  .get(gameController.getAllGames)
  .post(gameController.createGame)


router.route("/games/:id")
  .get(gameController.getGameById)
  .patch(gameController.updateGame)
  .delete(gameController.deleteById)





export default router