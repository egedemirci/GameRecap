import db from "../db.js";

export default class gameController {
  static async getAllGames(req, res, next) {
    try {
      const results = await db.query(
        "SELECT * FROM game_recap.publishingstudios"
      );
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          games: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all Publishing studios ${error}`);
      res.status(400).json({ error: error, data: { games: [] } });
    }
  }

  static async deleteById(req, res, next) {
    try {
      const results = await db.query(
        "DELETE FROM game_recap.publishingstudios WHERE d_studio_id = $1 returning *",
        [req.params.id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "Publishing studio not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({ data: results.rows[0] });
    } catch (err) {
      console.log(`Failed to delete Publishing studio ${err}.`);
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
        "INSERT INTO game_recap.publishingstudios (studio_name) values ($1) returning *",
        [req.body.studio_name]
      );
      res.status(200).json({
        data: newGame.rows[0],
      });
    } catch (error) {
      console.log(`Error when creating Publishing studio ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async getGamesByDate(req, res, next) {
    try {
      const result = await db.query(
        `SELECT * FROM game_recap.publishingstudios `
      );
      const filteredRows = result.rows.filter((row) =>
        row.studio_name.toLowerCase().startsWith(req.body.filter.toLowerCase())
      );
      console.log(filteredRows);
      console.log(result.rows);
      res.status(200).json({
        data: filteredRows,
      });
    } catch (error) {
      console.log(`Error when getting Publishing studio by id ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async getGameById(req, res, next) {
    try {
      const results = await db.query(
        "SELECT * FROM game_recap.publishingstudios WHERE d_studio_id = $1",
        [req.params.d_studio_id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "Publishing studio not found.",
          code: 1,
          error: new Error(),
        };
      }

      res.status(200).json({
        lenght: results.rows.length,
        data: results.rows[0],
      });
    } catch (error) {
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      console.log(`Error when getting Publishing studio by id ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async updateGame(req, res, next) {
    try {
      const result = await db.query(
        "UPDATE game_recap.Games SET game_name = $2 ,release_date = $3 WHERE game_id = $1 returning *",
        [req.params.id, req.body.game_name, req.body.release_date]
      );
      if (result.rows.length == 0) {
        throw {
          detail: "Publishing studio not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({
        data: result.rows[0],
      });
    } catch (err) {
      console.log(`Error when updating Publishing studio ${err}`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ error: err, data: [] });
    }
  }
}
