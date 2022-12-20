import db from "../db.js";

export default class gameController {
  static async getAllReviews(req, res, next) {
    try {
      const results = await db.query(`select review_date,
                                              text,
                                              game_name,
                                              username,
                                              game_id,
                                              user_id
                                          from game_recap.reviews 
                                          left join game_recap.games using(game_id)
                                          left join game_recap.users using(user_id)`);
      res.status(200).json({
        lenght: results.rows.length,
        data: {
          games: results.rows,
        },
      });
    } catch (error) {
      console.log(`Error when getting all reviews ${error}`);
      res.status(400).json({ error: error, data: { games: [] } });
    }
  }

  static async deleteById(req, res, next) {
    try {
      const results = await db.query(
        "DELETE FROM game_recap.reviews WHERE user_id = $1 and game_id = $2 returning *",
        [req.body.user_id, req.body.game_id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "Development studio not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({ data: results.rows[0] });
    } catch (err) {
      console.log(`Failed to delete Development studio ${err}.`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ detail: err, data: [] });
    }
  }

  static async getRateFilter(req, res, next) {
    try {
      const result = await db.query(
        `select review_date,
                                              text,
                                              game_name,
                                              username,
                                              game_id,
                                              user_id
                                          from game_recap.reviews 
                                          left join game_recap.games using(game_id)
                                          left join game_recap.users using(user_id)`
      );
      const filteredRows = result.rows.filter((row) =>
        row.username.toLowerCase().startsWith(req.body.filter.toLowerCase())
      );
      console.log(filteredRows);
      console.log(result.rows);
      res.status(200).json({
        data: filteredRows,
      });
    } catch (error) {
      console.log(`Error when getting reviews by id ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }
}
