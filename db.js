const Pool = require("pg").Pool;

const devConfig = {
    user: "postgres",
    host: "localhost",
    port: 5432,
    password:"password",
    database: "miniproject",
};

const prodConfig = {
    connectionString: process.env.DATABASE_URL,
};
const pool = new Pool(process.env.NODE_ENV ? prodConfig : devConfig);

module.exports = pool;
