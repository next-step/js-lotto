import { $, addEvent } from './util.js';
import { buttonSelector, formSelector } from './constants/selectors.js';
import { onCheckLottoNumbersToggleBtn, onSubmitLottoPurchaseForm, onSubmitLottoAnswerForm } from './event.js';
import { subscribeViewsToStore } from './view.js';

const initApp = function () {
	subscribeViewsToStore();
	addEvent($(formSelector.LOTTO_ANSWER_FORM), 'submit', onSubmitLottoAnswerForm);
	addEvent($(buttonSelector.LOTTO_NUMBERS_DETAIL_TOGGLE), 'change', onCheckLottoNumbersToggleBtn);
	addEvent($(formSelector.LOTTO_PURCHASE_FORM), 'submit', onSubmitLottoPurchaseForm);
};

initApp();
