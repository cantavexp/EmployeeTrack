// const { connect } = require('http2');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password1',
        database: 'employees_db'
    },
);

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = db;