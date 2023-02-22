const mysql = require('mysql');
// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employeeManager_db'
});

module.exports = db;