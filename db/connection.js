const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",
  // Your username
  user: "root",
  // Your password
  password: process.env.DB_PASSWORD,
  database: "employees"
},
console.log(`Connected to the 'employees' database.`)
);

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
