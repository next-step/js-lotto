import { lottoStore } from './store/lotto-store.js';
import { setInputMoney } from './action/lotto-actions.js';

export const savePriceInputValue = function (value) {
	lottoStore.dispatch(setInputMoney(Number(value)));
};

export const resetPriceInputValue = function () {
	lottoStore.dispatch(setInputMoney(0));
};

export const getInputMoney = function () {
	return lottoStore.getState().inputMoney;
};

export const getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
};
