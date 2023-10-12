const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "data", "app.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS test (key TEXT PRIMARY KEY, value TEXT)",
    (err) => {
      if (err) {
        console.error("Error creating 'test' table:", err);
      } else {
        console.log("Database table 'test' created or already exists.");
      }
    }
  );
});

module.exports = db;