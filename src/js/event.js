import { MODAL } from './constants/selectors.js';
import { $ } from './util.js';
import { closeModal, showModal, toggleLottoDetailNumbers } from './view.js';
import { getInputMoney, resetPriceInputValue, savePriceInputValueToStore, generateLottoList, saveLottoListToStore } from './model.js';
import { validateInputMoney } from './validate.js';

export const onClickOpenResultModalBtn = function () {
	showModal($(MODAL));
};

export const onClickCloseResultModalBtn = function () {
	closeModal($(MODAL));
};

export const onClickLottoNumbersToggleBtn = function () {
	toggleLottoDetailNumbers();
};

export const onSubmitLottoPurchaseForm = function (ev) {
	ev.preventDefault();
	const priceInput = getInputMoney();
	if (validateInputMoney(priceInput)) {
		generateLottoList(priceInput);
	}
};

export const onChangePriceInput = function (ev) {
	savePriceInputValueToStore(ev.target.value);
};
