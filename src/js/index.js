import { $, addEvent } from "./util.js";
import {
  RESULT__MODAL_OPEN_BUTTON,
  RESULT_MODAL_CLOSE_BUTTON,
  LOTTO_NUMBERS_TOGGLE_BUTTON,
  LOTTO_PURCHASE_FORM,
} from "./constants/selectors.js";
import {
  onClickOpenResultModalBtn,
  onClickCloseResultModalBtn,
  onClickLottoNumbersToggleBtn,
  onSubmitLottoPurchaseForm,
} from "./event.js";

const initApp = function () {
  addEvent($(RESULT__MODAL_OPEN_BUTTON), "click", onClickOpenResultModalBtn);
  addEvent($(RESULT_MODAL_CLOSE_BUTTON), "click", onClickCloseResultModalBtn);
  addEvent(
    $(LOTTO_NUMBERS_TOGGLE_BUTTON),
    "click",
    onClickLottoNumbersToggleBtn
  );
  addEvent($(LOTTO_PURCHASE_FORM), "submit", onSubmitLottoPurchaseForm);
};

initApp();
