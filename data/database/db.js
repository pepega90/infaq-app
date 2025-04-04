// database/db.js
import * as SQLite from "expo-sqlite";

// Open database connection
const db = SQLite.openDatabaseAsync("infaq");

// Initialize database tables
const initDB = async () => {
  const database = await db;
  try {
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS bulan (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nama_bulan TEXT NOT NULL
          );`
    );

    // Create warga table with foreign key
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS warga (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_bulan INTEGER,
            nama TEXT NOT NULL,
            tgl TEXT NOT NULL,
            alamat TEXT NOT NULL,
            nominal REAL NOT NULL,
            FOREIGN KEY (id_bulan) REFERENCES bulan(id)
          );`
    );
    console.log("Database initialized successfully");
    return true;
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
};
export { db, initDB };
