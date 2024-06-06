import pg from "pg";
import 'dotenv/config';

let { Pool } = pg;

let { DB_USER , DB_PASSWORD , DB_HOST , DB_DATABASE} = process.env

let config = {
    user : DB_USER,
    password : DB_PASSWORD,
    host : DB_HOST,
    database : DB_DATABASE,
    allowExitOnIdle : true
}

let pool = new Pool(config);

export default pool;