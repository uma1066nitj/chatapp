const mysql = require("mysql2/promise");

const dbConnection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAMEE,
  password: process.env.PASSWORD,
  database: process.env.DB,
});
console.log(process.env.USERNAMEE);

dbConnection.getConnection(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("connect");
});
module.exports = dbConnection;
