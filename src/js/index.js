import Lotto from "./lotto.js";
import * as SELECTOR from "./constants/selector.js";

const lotto = new Lotto({
  $paymentForm: document.querySelector(SELECTOR.PAYMENT_FORM),
  $payment: document.querySelector(SELECTOR.PAYMENT),
  $confirmBtn: document.querySelector(SELECTOR.CONFIRM_BTN),
  $lottoNumberSwitch: document.querySelector(SELECTOR.LOTTO_NUMBER_SWITCH),
  $lottoBoard: document.querySelector(SELECTOR.LOTTO_BOARD),
  $lottoCnt: document.querySelector(SELECTOR.LOTTO_CNT),
  $resultButton: document.querySelector(SELECTOR.RESULT_BUTTON),
  $winningNumbers: document.querySelectorAll(SELECTOR.WINNING_NUMBERS),
  $bonusNumber: document.querySelector(SELECTOR.BONUS_NUMBER),
  $profitRateText: document.querySelector(SELECTOR.PROFIT_RATE_TEXT),
  $modalClose: document.querySelector(SELECTOR.MODAL_CLOSE),
  $modal: document.querySelector(SELECTOR.MODAL),
  $resetBtn: document.querySelector(SELECTOR.RESET_BUTTON),
  $resultBoard: document.querySelector(SELECTOR.RESULT_BOARD),
});

lotto.bindEvents();
