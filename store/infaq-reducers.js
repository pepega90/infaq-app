import Infaq from '../models/infaq';

import { SET_INFAQ, ADD_INFAQ, GET_TOTAL, HAPUS_INFAQ } from './infaq-actions';

const initialState = {
	infaq: [],
};
export default (state = initialState, action) => {
	switch (action.type) {
		case SET_INFAQ:
			return {
				infaq: action.infaq.map(
					fq => new Infaq(fq.id.toString(), fq.bulan)
				),
			};
		case ADD_INFAQ:
			const newInfaq = new Infaq(
				action.infaqData.id.toString(),
				action.infaqData.bulan
			);
			return {
				infaq: state.infaq.concat(newInfaq),
			};
		case HAPUS_INFAQ:
			return {
				infaq: state.infaq.filter(fq => fq.id !== action.id),
			};
		default:
			return state;
	}
};
