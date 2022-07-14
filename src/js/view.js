import { LOTTO_NUMBERS_DETAIL, LOTTO_TICKETS_WRAPPER, PURCHASED_LOTTO_COUNT_TEXT } from './constants/selectors.js';
import { lottoStore } from './store/lotto-store.js';
import { $, $$ } from './util.js';

export const showModal = function (modalElement) {
	modalElement.classList.add('open');
};

export const closeModal = function (modalElement) {
	modalElement.classList.remove('open');
};

export const renderPurchasedLottoCnt = function (lottoCount) {
	$(PURCHASED_LOTTO_COUNT_TEXT).innerText = `${lottoCount}`;
};

export const subscribeViewsToStore = function () {
	lottoStore.subscribe(paintLottoTickets);
};

const generateLottoTicketComponent = function (detailNumbers) {
	const li = document.createElement('li');
	li.classList = 'mx-1 text-4xl d-flex lotto-ticket';

	const icon = document.createElement('span');
	icon.classList = 'lotto-icon';
	icon.innerText = '🎟️';

	const detail = document.createElement('span');
	detail.classList = 'lotto-detail';
	detail.innerText = Array.from(detailNumbers).join(',');

	li.appendChild(icon);
	li.appendChild(detail);
	return li;
};

const clearLottoTickets = function () {
	$(LOTTO_TICKETS_WRAPPER).innerHTML = '';
};

const paintLottoTickets = function () {
	clearLottoTickets();
	const { lottoList } = lottoStore.getState();
	renderPurchasedLottoCnt(lottoList.length);
	$(LOTTO_TICKETS_WRAPPER).innerHTML = lottoList.reduce((acc, lottoNums) => acc + generateLottoTicketComponent(lottoNums).outerHTML, '');
};

export const hideLottoDetailNumbers = function () {
	$(LOTTO_TICKETS_WRAPPER).classList.add('hide-detail');
};

export const showLottoDetailNumbers = function () {
	$(LOTTO_TICKETS_WRAPPER).classList.remove('hide-detail');
};
