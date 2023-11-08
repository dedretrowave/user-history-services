import pgp from 'pg-promise';
import dotenv from 'dotenv';
const postGres = pgp();
dotenv.config();

const connectionString: string = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}/${process.env.PG_DBNAME}`;

const db = postGres(connectionString);

export default db;