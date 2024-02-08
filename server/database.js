const mysql = require("mysql2");
require("dotenv").config();

// connection eka pool ekak widiyata hadanawa
const db = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB, // database eke nam danwa
  })
  .promise();

module.exports = db;
