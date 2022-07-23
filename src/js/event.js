import { formSelector, modalSelector } from './constants/selectors.js';
import { $, reduceNumberInputsToNums } from './util.js';
import {
	showLottoDetailNumbers,
	hideLottoDetailNumbers,
	showElement,
	showModal,
	closeModal,
	paintLottoResult,
	paintWinningCount,
} from './view.js';
import {
	resetPriceInputValue,
	savePriceInputValueToStore,
	resetLottoList,
	saveLottoAnswerListToStore,
	getAnswerCountArray,
	getProfiltRate,
	saveProfitRateToStore,
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
	}
};

export const onSubmitLottoAnswerForm = function (ev) {
	ev.preventDefault();
	const { elements } = ev.srcElement;
	const answerValues = reduceNumberInputsToNums(Array.from(elements));

	if (validateInputAnswer(answerValues)) {
		saveLottoAnswerListToStore(answerValues);
		const answerCountArray = getAnswerCountArray();
		paintWinningCount(answerCountArray);

		const profitRate = getProfiltRate(answerCountArray);
		saveProfitRateToStore(profitRate);
		paintLottoResult();
		showModal($(modalSelector.LOTTO_RESULT_MODAL));
	}
};

export const onClickCloseModalBtn = function () {
	closeModal($(modalSelector.LOTTO_RESULT_MODAL));
};
