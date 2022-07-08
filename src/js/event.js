import { MODAL } from './constants/selectors.js';
import { $ } from './util.js';
import { closeModal, showModal } from './view.js';
import { getInputMoney, savePriceInputValue } from './model.js';
import { isInputMoneyValid } from './validate.js';

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
	try {
		if (!isInputMoneyValid(priceInput)) {
			// 에러 fire
		}
	} catch (err) {}
};

export const onChangePriceInput = function (ev) {
	savePriceInputValue(Number(ev.target.value));
};
