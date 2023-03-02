const mysql = require("mysql");
import { SqlConnection } from "../types";
const mySqlConnection:SqlConnection = () => {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root12345",
    database: "nodeSql",
  });
  return connection;
};
module.exports = mySqlConnection;
