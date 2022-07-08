import { MODAL } from './constants/selectors.js';
import { $ } from './util.js';
import { closeModal, showModal } from './view.js';
import { getInputMoney, savePriceInputValue } from './model.js';

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
	console.log('v: ', priceInput);
};

export const onChangePriceInput = function (ev) {
	savePriceInputValue(ev.target.value);
};
