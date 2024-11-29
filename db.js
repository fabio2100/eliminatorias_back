// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'eliminatorias',
  password: '1947',
  port: 5432,
  charset: 'utf8'
});

module.exports = pool;
