import { lottoStore } from './store/lotto-store.js';
import { setInputMoney, setLottoList } from './action/lotto-actions.js';

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

export const generateLotto = function () {
	// validate 를 거친 priceInput 을 로또가격(1000) 으로 나눠
	// 나눈 몫이 구매한 로또 티켓의 갯수
	// 로또 티켓 갯수만큼 배열을 생성한다. 티켓이 3개면 배열도 3개
	// 해당 배열은 무조건 길이가 6이고, 원소는 모두 getRandomInt(1,45)로 채운다
	// 그러나 원소중에 중복되는 숫자가 있어서는 안된다.
	const MIN_LOTTO_NUM = 1;
	const MAX_LOTTO_NUM = 45;
	const MAX_LOTTO_NUMS_SIZE = 6;
	const lottoNums = new Set();
	while (lottoNums.size < MAX_LOTTO_NUMS_SIZE) {
		lottoNums.add(getRandomInt(MIN_LOTTO_NUM, MAX_LOTTO_NUM));
	}
	return lottoNums;
};

export const foo = function (priceInput) {
	console.log(priceInput);
};

export const saveLottoListToStore = function (lottoList) {
	lottoStore.dispatch(setLottoList(lottoList));
};
