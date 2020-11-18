const Pool = require("pg").Pool;

const devConfig = {
    user: "postgres",
    password: "shoes@loose",
    host: "localhost",
    port: 5432,
    database: "interntask",
};

const prodConfig = {
    connectionString: process.env.DATABASE_URL,
};
const pool = new Pool(process.env.NODE_ENV ? prodConfig : devConfig);

module.exports = pool;
