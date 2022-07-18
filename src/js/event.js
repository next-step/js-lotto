import { modalSelector, inputSelector } from "./constants/selectors.js";
import { $ } from "./util.js";
import {
  closeModal,
  showModal,
  showLottoDetailNumbers,
  hideLottoDetailNumbers,
} from "./view.js";
import {
  resetPriceInputValue,
  savePriceInputValueToStore,
  resetLottoList,
} from "./model.js";
import { validateInputMoney } from "./validate.js";

export const onClickOpenResultModalBtn = function () {
  showModal($(modalSelector.LOTTO_RESULT_MODAL));
};

export const onClickCloseResultModalBtn = function () {
  closeModal($(modalSelector.LOTTO_RESULT_MODAL));
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
  const inputMoney = $(inputSelector.LOTTO_PURCHASE_FORM_INPUT).valueAsNumber;
  if (validateInputMoney(inputMoney)) {
    savePriceInputValueToStore(inputMoney);
  }
};
