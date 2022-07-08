import { lottoStore } from './store/lotto-store.js';
import { setTypedPrice } from './action/lotto-actions.js';

export const savePriceInputValue = function (value) {
	lottoStore.dispatch(setTypedPrice(value));
};
