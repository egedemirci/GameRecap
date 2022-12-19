import db from "../db.js";

export default class subserviceController {
  static async getAllGames(req, res, next) {
    try {
      const results = await db.query(
        "SELECT * FROM game_recap.subscriptionservices"
      );
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          games: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all subscriptionservices ${error}`);
      res.status(400).json({ error: error, data: { games: [] } });
    }
  }

  static async deleteById(req, res, next) {
    try {
      const results = await db.query(
        "DELETE FROM game_recap.subscriptionservices WHERE service_id = $1 returning *",
        [req.params.id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "subscriptionservices not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({ data: results.rows[0] });
    } catch (err) {
      console.log(`Failed to delete subscriptionservices ${err}.`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }

  static async createGame(req, res, next) {
    try {
      const newGame = await db.query(
        "INSERT INTO game_recap.subscriptionservices (service_name) values ($1) returning *",
        [req.body.service_name]
      );
      res.status(200).json({
        data: newGame.rows[0],
      });
    } catch (error) {
      console.log(`Error when creating subscriptionservices ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async getGamesByDate(req, res, next) {
    try {
      const result = await db.query(
        `SELECT * FROM game_recap.subscriptionservices `
      );
      const filteredRows = result.rows.filter((row) =>
        row.service_name.toLowerCase().startsWith(req.body.filter.toLowerCase())
      );
      res.status(200).json({
        data: filteredRows,
      });
    } catch (error) {
      console.log(`Error when getting subscriptionservices by id ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }
}
