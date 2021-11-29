import Lotto from "./lotto.js";
import * as SELECTOR from "./constants/selector.js";

const lotto = new Lotto({
  $paymentForm: document.querySelector(SELECTOR.PAYMENT_FORM),
  $payment: document.querySelector(SELECTOR.PAYMENT),
  $confirmBtn: document.querySelector(SELECTOR.CONFIRM_BTN),
  $lottoNumberSwitch: document.querySelector(SELECTOR.LOTTO_NUMBER_SWITCH),
  $lottoBoard: document.querySelector(SELECTOR.LOTTO_BOARD),
  $lottoCnt: document.querySelector(SELECTOR.LOTTO_CNT),
  $showResultButton: document.querySelector(SELECTOR.SHOW_RESULT_BUTTON),
  $modalClose: document.querySelector(SELECTOR.MODAL_CLOSE),
  $modal: document.querySelector(SELECTOR.MODAL),
});

lotto.bindEvents();
