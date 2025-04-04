import { db } from "./db";

const insertMonthDataInit = async () => {
  const database = await db;
  const indonesianMonths = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  try {
    // Start a transaction to ensure atomic operations
    await database.execAsync("BEGIN TRANSACTION");

    // Check which months already exist in the database
    const existingMonths = await database.getAllAsync(
      `SELECT nama_bulan FROM bulan;`
    );
    const existingMonthNames = existingMonths.map((month) => month.nama_bulan);

    // Insert only months that don't exist yet
    for (const month of indonesianMonths) {
      if (!existingMonthNames.includes(month)) {
        await database.runAsync(
          `INSERT OR IGNORE INTO bulan (nama_bulan) VALUES (?);`,
          [month]
        );
        console.log(`Inserted month: ${month}`);
      }
    }

    await database.execAsync("COMMIT");
    console.log("Month insertion completed");
  } catch (err) {
    await database.execAsync("ROLLBACK");
    console.error("Error while inserting data", err);
  }
};

const getBulans = async () => {
  const database = await db;
  try {
    const res = await database.getAllAsync(`SELECT * FROM bulan`);
    return res;
  } catch (err) {
    console.error("error while get all bulan", err);
  }
};

const deleteBulan = async (id) => {
  const database = await db;
  try {
    await database.runAsync("DELETE FROM bulan WHERE id = ?", [id]);
  } catch (err) {
    console.error(`error while delete with id = ${id} `, err);
  }
};

const getListWargaByBulanId = async (id_bulan) => {
  const database = await db;
  try {
    const res = await database.getAllAsync(
      "SELECT * FROM warga WHERE id_bulan = ?",
      [id_bulan]
    );
    return res;
  } catch (err) {
    console.error(`error while get all warga by bulan id = ${id_bulan}`, err);
  }
};

const insertWarga = async (id_bulan, { alamat, nama, date, nominal }) => {
  const database = await db;
  try {
    await database.runAsync(
      "INSERT INTO warga (id_bulan, nama, tgl, alamat, nominal) VALUES (?,?,?,?,?)",
      [id_bulan, nama, date, alamat, nominal]
    );
  } catch (err) {
    console.error(`error insert data warga by id bulan = ${id_bulan}`, err);
  }
};

const updateWarga = async ({ alamat, nama, date, nominal, id }) => {
  const database = await db;
  try {
    await database.runAsync(
      "UPDATE warga SET nama = ?, tgl = ?, alamat = ?, nominal = ? WHERE id = ?",
      [nama, date, alamat, nominal, id]
    );
  } catch (err) {
    console.error(`error updating warga with id = ${id}`, err);
  }
};

const deleteWarga = async (id) => {
  const database = await db;
  try {
    await database.runAsync("DELETE FROM warga WHERE id = ?", [id]);
  } catch (err) {
    console.error(`error while deleting warga with id = ${id}`, err);
  }
};

const resetData = async () => {
  const database = await db;
  try {
    // Delete all warga data but keep bulan data
    await database.runAsync("DELETE FROM warga");
    console.log("All warga data has been deleted");
  } catch (err) {
    console.error("error while resetting data", err);
  }
};

const totalInfaq = async () => {
  const database = await db;
  try {
    const total = await database.getFirstAsync(
      "SELECT SUM(nominal) as total FROM warga"
    );
    return total;
  } catch (err) {
    console.error(`error while get total infaq: `, err);
  }
};

export {
  insertMonthDataInit,
  getBulans,
  deleteBulan,
  getListWargaByBulanId,
  insertWarga,
  updateWarga,
  deleteWarga,
  resetData,
  totalInfaq,
};
