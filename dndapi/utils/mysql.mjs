import mysql from 'mysql2/promise';
import config from '../config.mjs';

const con = await mysql.createConnection({
    host: config.dbhost,
    user: config.dbuser,
    database: config.dbdatabase,
    password: config.dbpassword
})

export { con };
