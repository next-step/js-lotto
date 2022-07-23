/* -------------------------------------------- 로또 구매 관련 -------------------------------------------- */

export const formSelector = {
	LOTTO_PURCHASE_FORM: '#lotto-purchase-form',
	LOTTO_ANSWER_FORM: '#lotto-answer-form',
};
export const buttonSelector = {
	LOTTO_PURCHASE_FORM_SUBMIT: '#price-submit-btn',
	LOTTO_RESULT_MODAL_OPEN: '.open-result-modal-button',
	LOTTO_RESULT_MODAL_CLOSE: '.modal-close',
	LOTTO_NUMBERS_DETAIL_TOGGLE: '.switch',
};

export const modalSelector = {
	LOTTO_RESULT_MODAL: '.modal',
};

export const inputSelector = {
	LOTTO_PURCHASE_FORM_INPUT: '#price-input',
	LOTTO_ANSWER_NUMBER_INPUT: '.winning-number',
	LOTTO_BONUS_NUMBER_INPUT: '.bonus-number',
};

export const ulSelector = {
	LOTTO_TICKETS_WRAPPER: '#lotto-tickets-wrapper',
};

export const liSelector = {
	LOTTO_TICKET: '.lotto-ticket',
};

export const spanSelector = {
	PURCHASED_LOTTO_COUNT_TEXT: '#lotto-purchased-count',
	LOTTO_NUMBERS_DETAIL: '.lotto-detail',
	PROFIT_SELECTOR: '.profit',
	WINNING_COUNT_SELECTOR: {
		3: '.winning-count-3',
		4: '.winning-count-4',
		5: '.winning-count-5',
		'5-bonus': '.winning-count-5-bonus',
		6: '.winning-count-6',
	},
};

export const sectionSelector = {
	LOTTO_MENU_SECTION: '#lotto-menu',
};
