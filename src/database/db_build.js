// build file - test and production
const fs = require("fs");

// modularised function
const buildDatabase = sqlFile => {
  return new Promise((resolve, reject) => {
    const connection = require("./db_connection");
    const sql = fs.readFileSync(`${__dirname}${sqlFile}`).toString();

    connection.query(sql, () => {
      try {
        resolve("database created");
        connection.end(() => {
          console.log("connection closed");
        });
      }
      catch {
        reject("error");
      }
    });
    
  });
};

module.exports = buildDatabase;