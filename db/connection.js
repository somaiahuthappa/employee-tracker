const mysql = require('mysql2');

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username
        user: 'root',
        // MySQL password
        password: 'Underhill_10@',
        database: 'employee_tracker_db'
    });

module.exports = db;