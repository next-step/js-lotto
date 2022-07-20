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
  const priceInputVal = ev.srcElement[0].value;
  resetPriceInputValue();
  resetLottoList();
  if (validateInputMoney(priceInputVal)) {
    savePriceInputValueToStore(priceInputVal);
  }
};
