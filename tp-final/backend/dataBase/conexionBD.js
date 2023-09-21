const mysql = require('mysql2/promise');

// pool de conexiones a la base de datos
const conexion = mysql.createPool({
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME
});


module.exports = conexion