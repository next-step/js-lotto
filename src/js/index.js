import { $, addEvent } from './util.js';
import { buttonSelector, formSelector } from './constants/selectors.js';
import { onClickOpenResultModalBtn, onClickCloseResultModalBtn, onCheckLottoNumbersToggleBtn, onSubmitLottoPurchaseForm } from './event.js';
import { subscribeViewsToStore } from './view.js';

const initApp = function () {
	subscribeViewsToStore();
	addEvent($(buttonSelector.LOTTO_RESULT_MODAL_OPEN), 'click', onClickOpenResultModalBtn);
	addEvent($(buttonSelector.LOTTO_RESULT_MODAL_CLOSE), 'click', onClickCloseResultModalBtn);
	addEvent($(buttonSelector.LOTTO_NUMBERS_DETAIL_TOGGLE), 'change', onCheckLottoNumbersToggleBtn);
	addEvent($(formSelector.LOTTO_PURCHASE_FORM), 'submit', onSubmitLottoPurchaseForm);
};

initApp();
