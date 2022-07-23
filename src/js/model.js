import { lottoStore } from './store/lotto-store.js';
import { setInputMoney, setLottoAnswerList, setLottoList, setProfitRate, resetAll } from './action/lotto-actions.js';
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

export const getAnswerCountArray = function () {
	const answerCountArray = [];
	const { lottoList, lottoAnswerList } = lottoStore.getState();
	const bonusAnswer = lottoAnswerList.pop();

	lottoList.forEach((lotto) => {
		const answerCnt = Array.from(lotto).reduce(
			(acc, cur) => {
				if (cur === bonusAnswer) {
					return { ...acc, bonus: true };
				}
				if (lottoAnswerList.some((answer) => answer === cur)) {
					return { ...acc, answerCnt: (acc.answerCnt += 1) };
				}
				return acc;
			},
			{ answerCnt: 0 }
		);
		answerCountArray.push(answerCnt);
	});
	return answerCountArray;
};

export const getProfiltRate = function (answerCountArray) {
	const { inputMoney } = lottoStore.getState();
	const WINNING_MONEY_BY_ANSWER = [0, 0, 0, 5000, 50000, 1500000, 2000000000];
	const WINNING_MONEY_5_BONUS = 30000000;
	const profit = answerCountArray.reduce((acc, cur) => {
		if (cur.bonus && cur.answerCnt === 5) {
			return acc + WINNING_MONEY_5_BONUS;
		}
		return acc + WINNING_MONEY_BY_ANSWER[cur.answerCnt];
	}, 0);

	const profitRate = ((profit - inputMoney) / inputMoney) * 100;
	return profitRate;
};

export const saveProfitRateToStore = function (profitRate) {
	lottoStore.dispatch(setProfitRate(profitRate));
};

export const resetAllData = function () {
	lottoStore.dispatch(resetAll());
};
