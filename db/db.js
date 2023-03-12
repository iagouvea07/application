const mysql = require('mysql2')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'some-pass',
    database: 'app'
})

module.exports = db