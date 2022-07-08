import { MODAL } from "./constants/selectors.js";
import { $ } from "./util.js";
import { closeModal, showModal } from "./view.js";
import { savePriceInputValue } from "./model.js";

export const onClickOpenResultModalBtn = function () {
  showModal($(MODAL));
};

export const onClickCloseResultModalBtn = function () {
  closeModal($(MODAL));
};

export const onClickLottoNumbersToggleBtn = function () {
  console.log("lotto toggle!");
};

export const onSubmitLottoPurchaseForm = function (ev) {
  ev.preventDefault();
};

export const onChangePriceInput = function (ev) {
  savePriceInputValue(ev.target.value);
};
