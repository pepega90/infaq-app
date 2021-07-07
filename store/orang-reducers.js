import Orang from '../models/orang';

import {
	ADD_ORANG,
	SET_ORANG,
	HAPUS_ORANG,
	HAPUS_ORANG_INFAQ,
} from './orang-actions';

const initialState = {
	orang: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ORANG:
			return {
				...state,
				orang: action.orang.map(
					or =>
						new Orang(
							or.id.toString(),
							or.nama,
							or.alamat,
							or.jumlah,
							or.infaqId
						)
				),
			};

		case ADD_ORANG:
			const newOrang = new Orang(
				action.dataOrang.id.toString(),
				action.dataOrang.nama,
				action.dataOrang.alamat,
				action.dataOrang.jumlah,
				action.dataOrang.infaqId
			);
			return {
				...state,
				orang: state.orang.concat(newOrang),
			};

		case HAPUS_ORANG:
			return {
				...state,
				orang: state.orang.filter(or => or.id !== action.id),
			};

		case HAPUS_ORANG_INFAQ:
			return {
				...state,
				orang: state.orang.filter(or => or.infaqId !== action.id),
			};
		default:
			return state;
	}
};
