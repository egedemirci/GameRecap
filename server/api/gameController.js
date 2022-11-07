import db from "../db.js"

export default class gameController{

    static async getAllGames(req, res, next){
        try {
          const results = await db.query('SELECT * FROM game_recap.Games')
          res.status(200).json({
            lenght: results.rows.length,
            data:{
              games: results.rows
            }
          })
        } catch (error) {
          console.log(`Error when getting all games ${error.detail}`)
          res.status(400).json({error:error, data:{games:[]}})
        }   
    }







}