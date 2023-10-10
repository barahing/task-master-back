require('dotenv');
const mysql = require('mysql2');
//const mysql2 = require ('mysql2');

const connection = mysql.createPool(
    {
        host: 'localhost',
        user: 'developer',
        password: 'developer123*',
        port: 3306,
        database: 'bd_taskmaster',
    }
);

module.exports = connection;