import db from "../db.js";

export default class developmentStudioController {
  static async getAllDevelopmentStudios(req, res, next) {
    try {
      const results = await db.query(
        "SELECT * FROM game_recap.DevelopmentStudios"
      );
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          developmentStudios: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all development studios ${error}`);
      res.status(400).json({ error: error, data: { games: [] } });
    }
  }
  static async getDevelopmentStudioById(req, res, next) {
    try {
      const results = await db.query(
        "SELECT * FROM game_recap.DevelopmentStudios WHERE d_studio_id = $1",
        [req.params.id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "Development Studio not found.",
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
      console.log(`Error when getting development studio by id ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async createDevelopmentStudio(req, res, next) {
    try {
      const result = await db.query(
        "INSERT INTO game_recap.DevelopmentStudios (studio_name) values ($1) returning *",
        [req.body.studio_name]
      );
      res.status(200).json({
        data: result.rows[0],
      });
    } catch (error) {
      console.log(`Error when creating development studio ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async updateDevelopmentStudio(req, res, next) {
    try {
      const result = await db.query(
        "UPDATE game_recap.DevelopmentStudios SET studio_name = $2 WHERE d_studio_id = $1 returning *",
        [req.params.id, req.body.studio_name]
      );
      if (result.rows.length == 0) {
        throw {
          detail: "Development Studio not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({
        data: result.rows[0],
      });
    } catch (error) {
      console.log(`Error when updating development studio ${error}`);
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
        "DELETE FROM game_recap.DevelopmentStudios WHERE d_studio_id = $1 returning *",
        [req.params.id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "Development Studio not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({ data: results.rows[0] });
    } catch (err) {
      console.log(`Failed to delete development studio ${err}.`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }
}
