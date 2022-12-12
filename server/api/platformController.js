import db from "../db.js";

export default class platformController {
  static async getAllPlatforms(req, res, next) {
    try {
      const results = await db.query("SELECT * FROM game_recap.Platforms");
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          platforms: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all platforms ${error}`);
      res.status(400).json({ error: error, data: { games: [] } });
    }
  }

  static async getPlatformById(req, res, next) {
    try {
      const results = await db.query(
        "SELECT * FROM game_recap.Platforms WHERE platform_id = $1",
        [req.params.id]
      );

      if (results.rows.length == 0) {
        throw {
          detail: "Platform not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({
        lenght: results.rows.length,
        data: results.rows[0],
      });
    } catch (error) {
      if (error.code == 1) {
        res.status(404).json({ detail: error.detail, data: [] });
        return;
      }
      console.log(`Error when getting platform by id ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async createPlatform(req, res, next) {
    try {
      const result = await db.query(
        "INSERT INTO game_recap.Platforms (platform_name) values ($1) returning *",
        [req.body.platform_name]
      );
      res.status(200).json({
        data: result.rows[0],
      });
    } catch (error) {
      console.log(`Error when creating platform ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async updatePlatform(req, res, next) {
    try {
      const result = await db.query(
        "UPDATE game_recap.Platforms SET platform_name = $2 WHERE platform_id = $1 returning *",
        [req.params.id, req.body.platform_name]
      );
      if (result.rows.length == 0) {
        throw {
          detail: "Platform not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({
        data: result.rows[0],
      });
    } catch (error) {
      console.log(`Error when updating platform ${error}`);
      if (error.code == 1) {
        res.status(404).json({ detail: error.detail, data: [] });
        return;
      }
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async deleteById(req, res, next) {
    try {
      const results = await db.query(
        "DELETE FROM game_recap.Platforms WHERE platform_id = $1 returning *",
        [req.params.id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "Platform not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({ data: results.rows[0] });
    } catch (err) {
      console.log(`Failed to delete platform ${err}.`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }
}
