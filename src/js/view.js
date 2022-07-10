import { PRICE_INPUT, PURCHASED_LOTTO_COUNT_TEXT } from './constants/selectors.js';
import { lottoStore } from './store/lotto-store.js';
import { $ } from './util.js';

export const showModal = function (modalElement) {
	modalElement.classList.add('open');
};

export const closeModal = function (modalElement) {
	modalElement.classList.remove('open');
};

export const renderPriceInput = function () {
	const { inputMoney } = lottoStore.getState();
	$(PRICE_INPUT).value = inputMoney;
};

export const renderPurchasedLottoCnt = function () {
	const { lottoList } = lottoStore.getState();
	console.log(lottoList);
	$(PURCHASED_LOTTO_COUNT_TEXT).innerText = `${lottoList.length}`;
};

export const subscribeViewsToStore = function () {
	lottoStore.subscribe(renderPurchasedLottoCnt);
	lottoStore.subscribe(renderPriceInput);
};
