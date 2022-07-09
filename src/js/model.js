import { lottoStore } from './store/lotto-store.js';
import { setInputMoney, setLottoList } from './action/lotto-actions.js';
import { LOTTO_PRICE } from './constants/nums.js';

export const savePriceInputValueToStore = function (value) {
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

const generateLottoNums = function () {
	const MIN_LOTTO_NUM = 1;
	const MAX_LOTTO_NUM = 45;
	const MAX_LOTTO_NUMS_SIZE = 6;
	const lottoNums = new Set();
	while (lottoNums.size < MAX_LOTTO_NUMS_SIZE) {
		lottoNums.add(getRandomInt(MIN_LOTTO_NUM, MAX_LOTTO_NUM));
	}
	return lottoNums;
};

export const generateLottoList = function (priceInput) {
	const lottoTicketCount = priceInput / LOTTO_PRICE;
	const lottoList = Array(lottoTicketCount).fill(generateLottoNums());
	saveLottoListToStore(lottoList);
};

const saveLottoListToStore = function (lottoList) {
	lottoStore.dispatch(setLottoList(lottoList));
};
