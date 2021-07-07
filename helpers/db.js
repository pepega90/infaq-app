import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('infaq.db');

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS catatan (id INTEGER PRIMARY KEY NOT NULL,  bulan TEXT NOT NULL);',
				[],
				() => {
					resolve();
				},
				(_, err) => {
					reject(err);
				}
			);
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS human (id INTEGER PRIMARY KEY NOT NULL, infaqId INTEGER NOT NULL, nama TEXT NOT NULL, alamat TEXT NOT NULL, jumlah REAL NOT NULL, FOREIGN KEY (infaqId) REFERENCES catatan (id));',
				[],
				() => {
					resolve();
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};

export const insertInfaq = bulan => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				'INSERT INTO catatan (bulan) VALUES (?);',
				[bulan],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};

export const insertOrang = (nama, alamat, jumlah, infaqId) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				'INSERT INTO human (nama, alamat, jumlah, infaqId) VALUES (?,?,?,?);',
				[nama, alamat, jumlah, infaqId],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});

	return promise;
};

export const fetchInfaq = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				'SELECT * FROM catatan',
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const fetchOrang = id => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`SELECT * FROM human WHERE infaqId = '${id}'`,
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const hapusOrang = id => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`DELETE FROM human WHERE id = ${id}`,
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const hapusOrangInfaq = id => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`DELETE FROM human WHERE infaqId = ${id}`,
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};

export const hapusCatatan = id => {
	const promise = new Promise((resolve, reject) => {
		db.transaction(tx => {
			tx.executeSql(
				`DELETE FROM catatan WHERE id = '${id}'`,
				[],
				(_, result) => {
					resolve(result);
				},
				(_, err) => {
					reject(err);
				}
			);
		});
	});
	return promise;
};
