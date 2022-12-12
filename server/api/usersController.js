import db from "../db.js";
import bcrypt from "bcrypt"

export default class authController {
    static async createUser(req, res, next){
        try {
          const salt = await bcrypt.genSalt(10);
          const hashed_password = await bcrypt.hash(req.body.password, salt);
          const timeElapsed = Date.now();
          const now = new Date(timeElapsed).toISOString()
          const newUser = await db.query('INSERT INTO game_recap.users (username, created_at, email, password) values ($1,$2,$3,$4) returning *'
          , [req.body.username, now, req.body.mail, hashed_password])
          res.status(200).json({
            data: newUser.rows[0],
          })
        } catch (error) {
          console.log(`Error when creating user: ${JSON.stringify(error)}`)
          console.log(`Error when creating user: ${error}`)
          if(String(error).includes("users_mail_key") )
          {
            return res.status(401).json({error:error, data:{users:[]}})
          }
          else if(error.code === 1)
          {
            return res.status(402).json({detail:error.detail, data:[]})
          }
          else{
            return res.status(400).json({error:error, data:{users:[]}})
          }
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