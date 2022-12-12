import db from "../db.js";

export default class gameController {
  static async getAllGames(req, res, next) {
    try {
      const results = await db.query("SELECT * FROM game_recap.Games");
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

  static async getGamesByDate(req, res, next) {
    try {
      let results = [];
      const start_date = req.body.start_date;
      const end_date = req.body.end_date;
      if (
        (start_date == " " || start_date == "") &&
        end_date != " " &&
        end_date != ""
      ) {
        results = await db.query(
          "SELECT * FROM game_recap.Games WHERE release_date <= $1",
          [end_date]
        );
      } else if (
        start_date != " " &&
        start_date != "" &&
        (end_date == " " || end_date == "")
      ) {
        results = await db.query(
          "SELECT * FROM game_recap.Games WHERE release_date >= $1",
          [start_date]
        );
      } else {
        results = await db.query(
          "SELECT * FROM game_recap.Games WHERE release_date >= $1 and release_date <= $2",
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

  static async getGameById(req, res, next) {
    try {
      const results = await db.query(
        `select g.game_id, g.synopsis,
         g.game_name, 
         g.release_date, 
         --l.lang_id, 
         string_agg(l.lang_name, ', ') as lang_name, 
         --s.store_id,
        string_agg(s.store_name, ', ') as store_name, 
        --ss.service_id, 
        string_agg(ss.service_name,  ', ') as service_name, 
        --d.dlc_id, 
        string_agg(d.dlc_name, ', ') as dlc_name,
        --ds.d_studio_id, 
        string_agg(ds.studio_name, ', ') as ds_name,
        --c.c_id, 
        string_agg(c.category_name, ', ') as category_name,
        --ps.p_studio_id, 
        string_agg(ps.studio_name, ', ') as ps_name,
        --p.platform_id, 
        string_agg(p.platform_name, ', ') as platform_name
from game_recap.games g
left join game_recap.languagesavailable la on g.game_id = la.game_id
left join game_recap.languages l on la.lang_id = l.lang_id
left join game_recap.gamesstores gs on g.game_id = gs.game_id
left join game_recap.onlinestores s on gs.store_id = s.store_id
left join game_recap.gamessubscriptionservices gss on g.game_id = gss.game_id
left join game_recap.subscriptionservices ss on gss.service_id = ss.service_id
left join game_recap.dlc d on g.game_id = d.game_id
left join game_recap.gamesdevelopment gd on g.game_id = gd.game_id
left join game_recap.developmentstudios ds on gd.d_studio_id = ds.d_studio_id
left join game_recap.gamescategories gc on g.game_id = gc.game_id
left join game_recap.categories c on gc.c_id = c.c_id
left join game_recap.gamespublishing gp on g.game_id = gp.game_id
left join game_recap.publishingstudios ps on gp.p_studio_id = ps.p_studio_id
left join game_recap.gamesplatforms gps on g.game_id = gps.game_id
left join game_recap.platforms p on gps.platform_id = p.platform_id
where g.game_id = $1
group by 1, 2, 3`,
        [req.params.id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "Game not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({
        length: results.rows.length,
        data: results.rows[0],
      });
    } catch (error) {
      if (error.code === 1) {
        res.status(404).json({ detail: error.detail, data: [] });
        return;
      }
      console.log(`Error when getting game by id ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }
  static async createGame(req, res, next) {
    try {
      const newGame = await db.query(
        "INSERT INTO game_recap.Games (game_name, release_date, synopsis) values ($1, $2, $3) returning *",
        [req.body.game_name, req.body.release_date, req.body.synopsis]
      );
      res.status(200).json({
        data: newGame.rows[0],
      });
    } catch (error) {
      console.log(`Error when creating game ${error}`);
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
          detail: "Game not found.",
          code: 1,
          error: new Error(),
        };
      }
      res.status(200).json({
        data: result.rows[0],
      });
    } catch (err) {
      console.log(`Error when updating game ${err}`);
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      res.status(400).json({ error: err, data: [] });
    }
  }

  static async deleteById(req, res, next) {
    try {
      const results = await db.query(
        "DELETE FROM game_recap.Games WHERE game_id = $1 returning *",
        [req.params.id]
      );
      if (results.rows.length == 0) {
        throw {
          detail: "Game not found.",
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
}
