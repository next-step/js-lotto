import { MODAL, PRICE_INPUT } from './constants/selectors.js';
import { $ } from './util.js';
import { closeModal, showModal, showLottoDetailNumbers, hideLottoDetailNumbers } from './view.js';
import { resetPriceInputValue, savePriceInputValueToStore, resetLottoList } from './model.js';
import { validateInputMoney } from './validate.js';

export const onClickOpenResultModalBtn = function () {
	showModal($(MODAL));
};

export const onClickCloseResultModalBtn = function () {
	closeModal($(MODAL));
};

export const onCheckLottoNumbersToggleBtn = function ({ target: { checked } }) {
	if (checked) {
		showLottoDetailNumbers();
	} else {
		hideLottoDetailNumbers();
	}
};

export const onSubmitLottoPurchaseForm = function (ev) {
	ev.preventDefault();
	resetPriceInputValue();
	resetLottoList();
	const inputMoney = $(PRICE_INPUT).valueAsNumber;
	if (validateInputMoney(inputMoney)) {
		savePriceInputValueToStore(inputMoney);
	}
};
