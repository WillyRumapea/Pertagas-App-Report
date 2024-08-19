const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pertagas",
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("koneksi ke database berhasil");
});

module.exports = connection;
