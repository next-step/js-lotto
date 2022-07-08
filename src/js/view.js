import { PURCHASED_LOTTO_COUNT_TEXT } from './constants/selectors.js';
import { lottoStore } from './store/lotto-store.js';
import { $ } from './util.js';

export const showModal = function (modalElement) {
	modalElement.classList.add('open');
};

export const closeModal = function (modalElement) {
	modalElement.classList.remove('open');
};

export const renderPurchasedLottoCnt = function () {
	const { purchasedLottoCnt } = lottoStore.getState();
	$(PURCHASED_LOTTO_COUNT_TEXT).innerText = `총${purchasedLottoCnt}개를 구매하였습니다`;
};

const initView = function () {
	lottoStore.subscribe(renderPurchasedLottoCnt);
};
initView();
