import { LOTTO_NUMBERS_DETAIL, LOTTO_TICKETS_WRAPPER, PRICE_INPUT, PURCHASED_LOTTO_COUNT_TEXT } from './constants/selectors.js';
import { lottoStore } from './store/lotto-store.js';
import { $, $$ } from './util.js';

export const showModal = function (modalElement) {
	modalElement.classList.add('open');
};

export const closeModal = function (modalElement) {
	modalElement.classList.remove('open');
};

export const renderPriceInput = function () {
	const { inputMoney: newState } = lottoStore.getState();
	$(PRICE_INPUT).value = newState;
};

export const renderPurchasedLottoCnt = function () {
	const { lottoList } = lottoStore.getState();
	const newState = lottoList.length;
	$(PURCHASED_LOTTO_COUNT_TEXT).innerText = `${newState}`;
};

// 지금은 상태의 프로퍼티 중 하나만 값이 변해도 나머지 모든 observer들이 실행된다.
// 상태의 특정 프로퍼티에만 subscribe 하는 방법은없을까?
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
	detail.classList = 'lotto-detail d-none';
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

export const toggleLottoDetailNumbers = function () {
	$$(LOTTO_NUMBERS_DETAIL).forEach((el) => el.classList.toggle('d-none'));
	$(LOTTO_TICKETS_WRAPPER).classList.toggle('flex-col');
};
