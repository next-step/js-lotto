import { LOTTO_TICKETS_WRAPPER, PRICE_INPUT, PURCHASED_LOTTO_COUNT_TEXT } from './constants/selectors.js';
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

// 상태의 특정 프로퍼티에만 describe 하는 방법은없을까?
export const subscribeViewsToStore = function () {
	lottoStore.subscribe(renderPurchasedLottoCnt);
	lottoStore.subscribe(renderPriceInput);
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

const paintLottoTickets = function () {
	const { lottoList } = lottoStore.getState();
	const lottoTicketsWrapper = $(LOTTO_TICKETS_WRAPPER);

	lottoList.forEach((lottoNums) => {
		const lottoComp = generateLottoTicketComponent(lottoNums);
		lottoTicketsWrapper.appendChild(lottoComp);
	});
};
