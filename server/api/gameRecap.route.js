import express from "express";
import gameController from "./gameController.js";
import developmentStudioController from "./developmentStudioController.js";
import authController from "./authController.js";
import usersController from "./usersController.js";
import dlcController from "./dlcController.js";
import categoryController from "./categoryController.js";
import languageController from "./languageController.js";
import userAdmin from "./adminUser.js";
import subserviceController from "./subserviceController.js";
import onlinestoreController from "./onlinestoreController.js";
import platformController from "./platformController.js";
import rateController from "./reviewController.js";
import publishingStudioController from "./publishingStudioController.js";
import reviewListController from "./reviewListController.js";

//Api calls are done through uri and router routes uri correct functions
//get request send through uri > router makes correct controllerCall > controller makes DBOcall > DBO returns results from db to controller > controller adds json to response of the request
const router = express.Router();

router.use(express.json());

//tell a route to look for a GET request on the root "/" URL and return some JSON:
router.route("/test").get((req, res) => {
  res.json({ info: "You request to GameRecap has been received!" });
});

router
  .route("/games")
  .get(gameController.getAllGames)
  .post(gameController.createGame);

router.route("/playlists/:id").get(gameController.getAllPlaylistsByUserId);

router.route("/playlist").post(gameController.createPlaylist);

router.route("/playlists").get(gameController.getAllPlaylists);

router.route("/playlists/:id").delete(gameController.deletePlaylistById);

router.route("/playlists/filter").post(gameController.filterAllPlaylists);

router.route("/playlist/:id").get(gameController.getPlaylistById);
router.route("/users/:id").get(gameController.getUserById);
router.route("/discover").get(gameController.getPlaylistsGenres);

router.route("/categories/date").post(categoryController.getGamesByDate);

router.route("/onlinestores/date").post(onlinestoreController.getGamesByDate);

router.route("/platforms/date").post(platformController.getGamesByDate);

router.route("/languages/date").post(languageController.getGamesByDate);

router
  .route("/developmentstudios/date")
  .post(developmentStudioController.getGamesByDate);

router.route("/dlc/date").post(dlcController.getGamesByDate);

router
  .route("/categories")
  .get(categoryController.getAllGames)
  .post(categoryController.createGame);

router
  .route("/categories/:id")
  .patch(categoryController.updateGame)
  .delete(categoryController.deleteById);

router
  .route("/languages")
  .get(languageController.getAllGames)
  .post(languageController.createGame);

router
  .route("/languages/:id")
  .get(languageController.getGameById)
  .patch(languageController.updateGame)
  .delete(languageController.deleteById);

router
  .route("/onlinestores")
  .get(onlinestoreController.getAllGames)
  .post(onlinestoreController.createGame);

router
  .route("/onlinestores/:id")
  .get(onlinestoreController.getGameById)
  .patch(onlinestoreController.updateGame)
  .delete(onlinestoreController.deleteById);

router
  .route("/platforms")
  .get(platformController.getAllGames)
  .post(platformController.createGame);

router
  .route("/platforms/:id")
  .patch(platformController.updateGame)
  .delete(platformController.deleteById);

router
  .route("/developmentstudios")
  .get(developmentStudioController.getAllGames)
  .post(developmentStudioController.createGame);

router
  .route("/developmentstudios/:id")
  .get(developmentStudioController.getGameById)
  .patch(developmentStudioController.updateGame)
  .delete(developmentStudioController.deleteById);

router
  .route("/publishingstudios")
  .get(publishingStudioController.getAllGames)
  .post(publishingStudioController.createGame);

router
  .route("/publishingstudios/:id")
  .get(publishingStudioController.getGameById)
  .patch(publishingStudioController.updateGame)
  .delete(publishingStudioController.deleteById);

router
  .route("/publishingstudios/filter")
  .post(publishingStudioController.getGamesByDate);

router
  .route("/dlc")
  .get(dlcController.getAllGames)
  .post(dlcController.createDlc);

router
  .route("/dlc/:id")
  .get(dlcController.getDLCById)
  .patch(dlcController.updateGame)
  .delete(dlcController.deleteById);

router
  .route("/games/:id")
  .get(gameController.getGameById)
  .patch(gameController.updateGame)
  .delete(gameController.deleteById);

router.route("/games/date").post(gameController.getGamesByDate);

router
  .route("/subservice")
  .get(subserviceController.getAllGames)
  .post(subserviceController.createGame);

router.route("/subservice/date").post(subserviceController.getGamesByDate);

router.route("/subservice/:id").delete(subserviceController.deleteById);

router.route("/useradmin").get(userAdmin.getAllGames);

router.route("/useradmin/:id").delete(userAdmin.deleteById);

router.route("/useradmin/date").post(userAdmin.getGamesByDate);

/*
router
  .route("/platforms")
  .get(platformController.getAllPlatforms)
  .post(platformController.createPlatform);

router
  .route("/platforms/:id")
  .get(platformController.getPlatformById)
  .patch(platformController.updatePlatform)
  .delete(platformController.deleteById);

/*
router
  .route("/developmentStudios")
  .get(developmentStudioController.getAllDevelopmentStudios)
  .post(developmentStudioController.createDevelopmentStudio);

router
  .route("/developmentStudios/:id")
  .get(developmentStudioController.getDevelopmentStudioById)
  .patch(developmentStudioController.updateDevelopmentStudio)
  .delete(developmentStudioController.deleteById);
*/

router
  .route("/rate/")
  .post(rateController.rateGame)
  .get(rateController.getRate)
  .put(rateController.getAllRate);

router.route("/auth").post(authController.login);

router.route("/users").post(usersController.createUser);

router
  .route("/dlcrate/")
  .post(rateController.rateDLC)
  .get(rateController.getRateDlc)
  .put(rateController.getAllRateDLC);

router.route("/reviews")
  .get(reviewListController.getAllReviews)
  .patch(reviewListController.deleteById)
  .post(reviewListController.getRateFilter);
export default router;
