import {
	insertOrang,
	fetchOrang,
	hapusOrang,
	hapusOrangInfaq,
} from '../helpers/db';

// Action identifier
export const ADD_ORANG = 'ADD_ORANG';
export const SET_ORANG = 'SET_ORANG';
export const HAPUS_ORANG = 'HAPUS_ORANG';
export const HAPUS_ORANG_INFAQ = 'HAPUS_ORANG_INFAQ';
// Action creator

export const addOrang = (nama, alamat, jumlah, infaqId) => {
	return async dispatch => {
		try {
			const dbResult = await insertOrang(nama, alamat, jumlah, infaqId);

			dispatch({
				type: ADD_ORANG,
				dataOrang: {
					id: dbResult.insertId,
					nama: nama,
					alamat: alamat,
					jumlah: jumlah,
					infaqId: infaqId,
				},
			});
		} catch (err) {
			throw err;
			console.log(err);
		}
	};
};

export const hapus = id => {
	return async dispatch => {
		try {
			const dbResult = await hapusOrang(id);

			dispatch({
				type: HAPUS_ORANG,
				id: id,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const deleteOrangInfaq = id => {
	return async dispatch => {
		try {
			const dbResult = await hapusOrangInfaq(id);

			dispatch({
				type: HAPUS_ORANG_INFAQ,
				id: id,
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const loadOrang = id => {
	return async dispatch => {
		try {
			const dbResult = await fetchOrang(id);

			dispatch({
				type: SET_ORANG,
				orang: dbResult.rows._array,
			});
		} catch (err) {
			throw err;
			console.log(err);
		}
	};
};
