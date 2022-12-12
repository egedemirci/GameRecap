import db from "../db.js";
import bcrypt from "bcrypt"

export default class authController {
  static async login(req, res, next) {
    try {
        const resolvedUser = await db.query('SELECT * from game_recap.users WHERE email = $1'
        , [req.body.mail])
        if(resolvedUser.rows.length == 0)
          {
            throw {
              detail: "User mail not found.",
              code: 1,
              error: new Error()
            };
          }
          const foundUser = resolvedUser.rows[0]
          const validPassword = await bcrypt.compare(req.body.password, foundUser.password);
        if(!validPassword) {
            
          throw {
            detail: "User password not found.",
            code: 1,
            error: new Error()
          }
        }
        res.status(200).json({
          data: resolvedUser.rows[0],
        })
  
      } catch (err) {
        console.log(`Error when auth: ${err.detail}`)
        if(err.code == 1)
        {
          res.status(404).json({detail:err.detail, data:[]})
          return
        }
        res.status(400).json({detail:err, data:[]})
        }   
  }
}

/*
CREATE TABLE game_recap.Users (
  user_id SERIAL NOT NULL,
  username VARCHAR(50),
  created_at DATE,
  PRIMARY KEY (user_id)
);

*/