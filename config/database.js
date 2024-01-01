const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: 'localhost',
  database: 'notes_app',
  user: 'root',
  password: 'Belgeee97',
});

module.exports = db;
