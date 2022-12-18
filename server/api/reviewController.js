import db from "../db.js";
import moment from 'moment';

export default class rateController {

    static async rateGame(req, res, next){
        try {
            const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
            const result = await db.query(
              "INSERT INTO game_recap.reviews (user_id, game_id, review_date, text) values ($1,$2,$3,$4) returning *",
              [req.body.user_id, req.body.game_id, timestamp, req.body.text]
            );
            res.status(200).json({
              data: result.rows[0],
            });
          } catch (error) {
            console.log(`Error when reviewing ${error}`);
            res.status(400).json({ error: error.detail, error: error.code, data: [] });
          }
        }

        static async rateDLC(req, res, next){
          try {
              const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
              const result = await db.query(
                "INSERT INTO game_recap.dlcreviews (user_id, dlc_id, review_date, text) values ($1,$2,$3,$4) returning *",
                [req.body.user_id, req.body.dlc_id, timestamp, req.body.text]
              );
              res.status(200).json({
                data: result.rows[0],
              });
            } catch (error) {
              console.log(`Error when reviewing ${error}`);
              res.status(400).json({ error: error.detail, error: error.code, data: [] });
            }
          }

        static async getRate(req, res, next){
            try {
                const result = await db.query(
                  "SELECT * FROM game_recap.reviews WHERE user_id = $1 AND game_id = $2",
                  [req.query.uid, req.query.gid]
                )
                if(result.rows.length === 0)
                  {
                    console.log(`Error when getting user review`);
                    res.status(400).json({data: [] });
                    return
                  }
                res.status(200).json({
                  data: result.rows[0],
                });
              } catch (error) {
                console.log(`Error when getting user review ${error}`);
                res.status(400).json({ error: error.detail, error: error.code, data: [] });
              }
            }


        static async getRateDlc(req, res, next){
          try {
              const result = await db.query(
                "SELECT * FROM game_recap.reviews WHERE user_id = $1 AND dlc_id = $2",
                [req.query.uid, req.query.did]
              );
              if(result.rows.length === 0)
                  {
                    console.log(`Error when getting user review`);
                    res.status(400).json({data: [] });
                    return
                  }
              res.status(200).json({
                data: result.rows[0],
              });
            } catch (error) {
              console.log(`Error when getting user review ${error}`);
              res.status(400).json({ error: error.detail, error: error.code, data: [] });
            }
          }
}
