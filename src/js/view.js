import { PRICE_INPUT, PURCHASED_LOTTO_COUNT_TEXT } from './constants/selectors.js';
import { lottoStore } from './store/lotto-store.js';
import { $ } from './util.js';

export const showModal = function (modalElement) {
	modalElement.classList.add('open');
};

export const closeModal = function (modalElement) {
	modalElement.classList.remove('open');
};

const shouldRePaint = function (prevState, newState) {
	return prevState !== newState;
};

export const renderPriceInput = function () {
	const { inputMoney: newState } = lottoStore.getState();
	$(PRICE_INPUT).value = newState;
};

export const renderPurchasedLottoCnt = function () {
	const prevState = Number($(PURCHASED_LOTTO_COUNT_TEXT).innerText);
	const { lottoList } = lottoStore.getState();
	const newState = lottoList.length;
	if (!shouldRePaint(prevState, newState)) return;
	$(PURCHASED_LOTTO_COUNT_TEXT).innerText = `${newState}`;
};

export const subscribeViewsToStore = function () {
	lottoStore.subscribe(renderPurchasedLottoCnt);
	lottoStore.subscribe(renderPriceInput);
};
