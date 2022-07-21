import { lottoStore } from './store/lotto-store.js';
import { setInputMoney, setLottoAnswerList, setLottoList } from './action/lotto-actions.js';
import { LOTTO_PRICE, MAX_LOTTO_NUM, MAX_LOTTO_NUMS_SIZE, MIN_LOTTO_NUM } from './constants/nums.js';

export const savePriceInputValueToStore = function (inputMoney) {
	lottoStore.dispatch(setInputMoney(inputMoney));
	generateLottoList(inputMoney);
};

export const resetPriceInputValue = function () {
	lottoStore.dispatch(setInputMoney(0));
};

export const resetLottoList = function () {
	saveLottoListToStore([]);
};

export const getInputMoney = function () {
	return lottoStore.getState().inputMoney;
};

export const getRandomInt = function (min, max) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
};

const generateLottoNums = function () {
	const lottoNums = new Set();
	while (lottoNums.size < MAX_LOTTO_NUMS_SIZE) {
		lottoNums.add(getRandomInt(MIN_LOTTO_NUM, MAX_LOTTO_NUM));
	}
	return lottoNums;
};

export const generateLottoList = function (priceInput) {
	const lottoTicketCount = priceInput / LOTTO_PRICE;
	const newLottoList = Array(lottoTicketCount).fill(undefined);
	saveLottoListToStore(
		newLottoList.map(() => {
			const lottoNums = generateLottoNums();
			return lottoNums;
		})
	);
};

export const saveLottoListToStore = function (lottoList) {
	lottoStore.dispatch(setLottoList(lottoList));
};

export const saveLottoAnswerListToStore = function (answerList) {
	lottoStore.dispatch(setLottoAnswerList(answerList));
};
