import { spanSelector, ulSelector } from './constants/selectors.js';
import { lottoStore } from './store/lotto-store.js';
import { $ } from './util.js';

export const showModal = function (modalElement) {
	modalElement.classList.add('open');
};

export const closeModal = function (modalElement) {
	modalElement.classList.remove('open');
};

export const hideElement = function (element) {
	element.classList.add('d-none');
};

export const showElement = function (element) {
	element.classList.remove('d-none');
};

export const renderPurchasedLottoCnt = function (lottoCount) {
	$(spanSelector.PURCHASED_LOTTO_COUNT_TEXT).innerText = `${lottoCount}`;
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
	$(ulSelector.LOTTO_TICKETS_WRAPPER).innerHTML = '';
};

const paintLottoTickets = function () {
	clearLottoTickets();
	const { lottoList } = lottoStore.getState();
	renderPurchasedLottoCnt(lottoList.length);
	$(ulSelector.LOTTO_TICKETS_WRAPPER).innerHTML = lottoList.reduce(
		(acc, lottoNums) => acc + generateLottoTicketComponent(lottoNums).outerHTML,
		''
	);
};

export const hideLottoDetailNumbers = function () {
	$(ulSelector.LOTTO_TICKETS_WRAPPER).classList.add('hide-detail');
};

export const showLottoDetailNumbers = function () {
	$(ulSelector.LOTTO_TICKETS_WRAPPER).classList.remove('hide-detail');
};
