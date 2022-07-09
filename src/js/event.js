import { MODAL } from './constants/selectors.js';
import { $ } from './util.js';
import { closeModal, showModal } from './view.js';
import { getInputMoney, getRandomInt, resetPriceInputValue, savePriceInputValue } from './model.js';
import { validateInputMoney } from './validate.js';

export const onClickOpenResultModalBtn = function () {
	showModal($(MODAL));
};

export const onClickCloseResultModalBtn = function () {
	closeModal($(MODAL));
};

export const onClickLottoNumbersToggleBtn = function () {
	console.log('lotto toggle!');
};

export const onSubmitLottoPurchaseForm = function (ev) {
	ev.preventDefault();
	const priceInput = getInputMoney();
	if (validateInputMoney(priceInput)) {
		// for (let i = 0; i < 100; i++) {
		// 	console.log(getRandomInt(1, 45));
		// }
	} else {
		resetPriceInputValue();
	}
};

export const onChangePriceInput = function (ev) {
	savePriceInputValue(ev.target.value);
};
