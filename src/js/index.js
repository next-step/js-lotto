import { $, addEvent } from './util.js';
import {
	RESULT__MODAL_OPEN_BUTTON,
	RESULT_MODAL_CLOSE_BUTTON,
	LOTTO_NUMBERS_TOGGLE_BUTTON,
	LOTTO_PURCHASE_FORM,
} from './constants/selectors.js';
import { onClickOpenResultModalBtn, onClickCloseResultModalBtn, onCheckLottoNumbersToggleBtn, onSubmitLottoPurchaseForm } from './event.js';
import { subscribeViewsToStore } from './view.js';

const initApp = function () {
	subscribeViewsToStore();
	addEvent($(RESULT__MODAL_OPEN_BUTTON), 'click', onClickOpenResultModalBtn);
	addEvent($(RESULT_MODAL_CLOSE_BUTTON), 'click', onClickCloseResultModalBtn);
	addEvent($(LOTTO_NUMBERS_TOGGLE_BUTTON), 'change', onCheckLottoNumbersToggleBtn);
	addEvent($(LOTTO_PURCHASE_FORM), 'submit', onSubmitLottoPurchaseForm);
};

initApp();
