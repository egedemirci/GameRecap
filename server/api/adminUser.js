import db from "../db.js";

export default class userAdmin {
  static async getAllGames(req, res, next) {
    try {
      const results = await db.query("SELECT user_id, username, email, created_at FROM game_recap.users");
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          games: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all games ${error}`);
      res.status(400).json({ error: error, data: { games: [] } });
    }
  }

  static async deleteById(req, res, next) {
    try {
      const results = await db.query(
        "DELETE FROM game_recap.users WHERE user_id = $1 returning *",
        [req.params.id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "user not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({ data: results.rows[0] });
    } catch (err) {
      console.log(`Failed to delete user ${err}.`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }

  
  static async getGamesByDate(req, res, next) {
    try {
        
      let results = []
      const start_date = req.body.start_date;
      const end_date = req.body.end_date;
      if ((start_date == " " || start_date == "") && (end_date != " " && end_date != "")){
        results = await db.query(
          "SELECT user_id, username, email, created_at FROM game_recap.users WHERE created_at <= $1",
          [end_date]
        );
      }

      else if ((start_date != " " && start_date != "") && (end_date == " " || end_date == "")){
        results = await db.query(
          "SELECT user_id, username, email, created_at FROM game_recap.users WHERE created_at >= $1",
          [start_date]
        );
      }

      else{
        results = await db.query(
          "SELECT user_id, username, email, created_at FROM game_recap.users WHERE created_at >= $1 and created_at <= $2",
          [start_date, end_date]
        );
      }
      
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          games: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting games by date filter ${error}`);
      res.status(400).json({ error: error, data: { games: [] } });
    }
  }

}
