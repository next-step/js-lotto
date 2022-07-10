import { MODAL } from './constants/selectors.js';
import { $ } from './util.js';
import { closeModal, showModal } from './view.js';
import { getInputMoney, resetPriceInputValue, savePriceInputValueToStore, generateLottoList, saveLottoListToStore } from './model.js';
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
	// 초기화
	const priceInput = getInputMoney();
	if (validateInputMoney(priceInput)) {
		generateLottoList(priceInput);
	}
};

export const onChangePriceInput = function (ev) {
	savePriceInputValueToStore(ev.target.value);
};
