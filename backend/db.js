const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "2105116",
    host: "localhost",
    port: 5432,
    database: "coursera"
});

module.exports = pool;