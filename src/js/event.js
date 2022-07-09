import { MODAL } from './constants/selectors.js';
import { $ } from './util.js';
import { closeModal, showModal } from './view.js';
import { getInputMoney, resetPriceInputValue, savePriceInputValue } from './model.js';
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
		console.log('이제 로또를 발급해보자');
	} else {
		resetPriceInputValue();
	}
};

export const onChangePriceInput = function (ev) {
	savePriceInputValue(ev.target.value);
};
