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

  static async getAllPlaylists(req, res, next) {
    try {
      const results = await db.query("SELECT * FROM game_recap.playlists WHERE user_id = $1" , [req.params.id]);
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

  static async getPlaylistsGenres(req, res, next) {
    try {
      const results = await db.query("with temp as (select gp.playlist_id, playlist_name, category_name, count(*) as count from game_recap.gamesplaylists gp left join game_recap.gamescategories gc using(game_id) left join game_recap.categories c on gc.c_id = c.c_id left join game_recap.playlists p on gp.playlist_id = p.playlist_id group by gp.playlist_id, playlist_name, category_name), max as (select playlist_id, max(count) as count from temp group by 1) select playlist_id, playlist_name, string_agg(category_name, ', ') from temp right join max using (playlist_id, count) group by 1,2");
      console.log(results);
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



  static async getPlaylistById(req, res, next) {
    try {
      const results = await db.query("SELECT g.game_name, g.game_id FROM game_recap.games g, game_recap.gamesplaylists p WHERE g.game_id = p.game_id AND p.playlist_id = $1;" , [req.params.id]);
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


  static async getUserById(req, res, next){
    console.log(`here`);
    try {

      const result = await db.query('SELECT * FROM game_recap.users WHERE user_id = $1', [req.params.id])
      console.log("aaa");
      if(result.rows.length == 0)
      {
        throw {
          detail: "User not found.",
          code: 1,
          error: new Error()
        };
      }

      res.status(200).json({
      data: result.rows[0]
      })
    } catch (err) {
      console.log(`Error when getting one user ${err}`)
      if(err.code == 1)
      {
        res.status(404).json({detail:err.detail, data:[]})
        return
      }
      res.status(400).json({detail:err, data:[]})
    }   
  }
  static async getGamesByDate(req, res, next) {
    try {
      let results = []
      const start_date = req.body.start_date;
      const end_date = req.body.end_date;
      if ((start_date == " " || start_date == "") && (end_date != " " && end_date != "")){
        results = await db.query(
          "SELECT * FROM game_recap.Games WHERE release_date <= $1",
          [end_date]
        );
      }

      else if ((start_date != " " && start_date != "") && (end_date == " " || end_date == "")){
        results = await db.query(
          "SELECT * FROM game_recap.Games WHERE release_date >= $1",
          [start_date]
        );
      }

      else{
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
        "SELECT * FROM game_recap.Games WHERE game_id = $1",
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
        lenght: results.rows.length,
        data: results.rows[0],
      });
    } catch (error) {
      if (err.code == 1) {
        res.status(404).json({ detail: err.detail, data: [] });
        return;
      }
      console.log(`Error when getting game by id ${error}`);
      res.status(400).json({ error: error, data: [] });
    }
  }

  static async createGame(req, res, next) {
    try {
      const newGame = await db.query(
        "INSERT INTO game_recap.Games (game_name,release_date) values ($1, $2) returning *",
        [req.body.game_name, req.body.release_date]
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
