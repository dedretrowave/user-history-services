const pgp = require('pg-promise')();
require('dotenv').config();

const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}/${process.env.PG_DBNAME}`;

const db = pgp(connectionString);

module.exports = db;