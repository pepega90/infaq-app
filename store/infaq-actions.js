import { fetchInfaq, hapusCatatan, insertInfaq, getTotal } from '../helpers/db';

// Action identifier

// Infaq
export const SET_INFAQ = 'SET_INFAQ';
export const ADD_INFAQ = 'ADD_INFAQ';
export const HAPUS_INFAQ = 'HAPUS_INFAQ';

export const hapusInfaq = id => {
	return async dispatch => {
		try {
			const dbResult = await hapusCatatan(id);

			dispatch({
				type: HAPUS_INFAQ,
				id: id,
			});
		} catch (err) {
			throw err;
			console.log(err);
		}
	};
};

export const addInfaq = bulan => {
	return async dispatch => {
		try {
			const dbResult = await insertInfaq(bulan);

			dispatch({
				type: ADD_INFAQ,
				infaqData: {
					id: dbResult.insertId,
					bulan: bulan,
				},
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	};
};

export const loadInfaq = () => {
	return async dispatch => {
		try {
			const dbResult = await fetchInfaq();
			dispatch({ type: SET_INFAQ, infaq: dbResult.rows._array });
		} catch (err) {
			throw err;
		}
	};
};
