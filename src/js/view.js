import { BONUS_FIVE } from './constants/nums.js';
import { formSelector, inputSelector, sectionSelector, spanSelector, ulSelector } from './constants/selectors.js';
import { lottoStore } from './store/lotto-store.js';
import { $, $$ } from './util.js';

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
	lottoStore.subscribe(paintLottoResult);
	lottoStore.subscribe(paintWinningCount);
};

const generateLottoTicketComponent = function (detailNumbers) {
	const li = document.createElement('li');
	li.classList = 'mx-1 text-4xl d-flex lotto-ticket';

	const icon = document.createElement('span');
	icon.classList = 'lotto-icon';
	icon.innerText = '🎟️';

	const detail = document.createElement('span');
	detail.classList = 'lotto-detail';
	detail.innerText = Array.from(detailNumbers).join(', ');

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
	const lottoTicketsWrapper = $(ulSelector.LOTTO_TICKETS_WRAPPER);
	lottoTicketsWrapper.classList.add('hide-detail');
	lottoTicketsWrapper.classList.remove('flex-col');
};

export const showLottoDetailNumbers = function () {
	const lottoTicketsWrapper = $(ulSelector.LOTTO_TICKETS_WRAPPER);
	lottoTicketsWrapper.classList.remove('hide-detail');
	lottoTicketsWrapper.classList.add('flex-col');
};

export const paintWinningCount = function () {
	const { lottoAnswerCountArray } = lottoStore.getState();
	const winningCountMap = {
		0: 0,
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		'5-bonus': 0,
		6: 0,
	};
	lottoAnswerCountArray.forEach((el) => {
		if (el.bonus && el.answerCnt === 5) {
			winningCountMap['5-bonus']++;
		} else {
			winningCountMap[el.answerCnt]++;
		}
	});
	Object.keys(winningCountMap).forEach((winningCount) => {
		const winningCountElement = $(spanSelector.WINNING_COUNT_SELECTOR[winningCount]);
		if (winningCountElement) {
			winningCountElement.innerHTML = winningCountMap[winningCount];
		}
	});
};

export const paintLottoResult = function () {
	const { profitRate } = lottoStore.getState();
	$(spanSelector.PROFIT_SELECTOR).innerHTML = profitRate;
};
