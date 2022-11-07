import * as pg from 'pg'
import dotenv from "dotenv"

dotenv.config({
    path: '../.env'
})
const { Pool } = pg.default

const pool = new Pool({
    connectionString : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

export default class db{
    static async query (text, params) 
    {
        return pool.query(text, params)
    }
}