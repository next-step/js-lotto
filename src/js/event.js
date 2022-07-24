import { formSelector, modalSelector, sectionSelector } from './constants/selectors.js';
import { $, $$, reduceNumberInputsToNums } from './util.js';
import { showLottoDetailNumbers, hideLottoDetailNumbers, showElement, showModal, closeModal, hideElement } from './view.js';
import {
	resetPriceInputValue,
	savePriceInputValueToStore,
	resetLottoList,
	saveLottoAnswerListToStore,
	getAnswerCountArray,
	getProfiltRate,
	saveProfitRateToStore,
	resetAllData,
	saveLottoAnswerCountList,
} from './model.js';
import { validateInputMoney, validateInputAnswer } from './validate.js';

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
	const priceInputVal = ev.srcElement[0].valueAsNumber;
	if (validateInputMoney(priceInputVal)) {
		savePriceInputValueToStore(priceInputVal);
		showElement($(formSelector.LOTTO_ANSWER_FORM));
		showElement($(sectionSelector.LOTTO_MENU_SECTION));
	}
};

export const onSubmitLottoAnswerForm = function (ev) {
	ev.preventDefault();
	const { elements } = ev.srcElement;
	const answerValues = reduceNumberInputsToNums(Array.from(elements));

	if (validateInputAnswer(answerValues)) {
		saveLottoAnswerListToStore(answerValues);
		const answerCountArray = getAnswerCountArray();
		saveLottoAnswerCountList(answerCountArray);

		const profitRate = getProfiltRate();
		saveProfitRateToStore(profitRate);
		showModal($(modalSelector.LOTTO_RESULT_MODAL));
	}
};

export const onClickCloseModalBtn = function () {
	closeModal($(modalSelector.LOTTO_RESULT_MODAL));
};

export const onClickResetBtn = function () {
	resetAllData();
	$$('input').forEach((input) => (input.value = null));
	hideElement($(sectionSelector.LOTTO_MENU_SECTION));
	hideElement($(formSelector.LOTTO_ANSWER_FORM));
	closeModal($(modalSelector.LOTTO_RESULT_MODAL));
};
