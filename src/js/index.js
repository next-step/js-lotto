import Lotto from "./lotto.js";
import * as SELECTOR from "./constants/selector.js";

const $showResultButton = document.querySelector(SELECTOR.SHOW_RESULT_BUTTON);
const $modalClose = document.querySelector(SELECTOR.MODAL_CLOSE);
const $modal = document.querySelector(SELECTOR.MODAL);

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

const lotto = new Lotto({
  $paymentForm: document.querySelector(SELECTOR.PAYMENT_FORM),
  $payment: document.querySelector(SELECTOR.PAYMENT),
  $confirmBtn: document.querySelector(SELECTOR.CONFIRM_BTN),
  $lottoNumberSwitch: document.querySelector(SELECTOR.LOTTO_NUMBER_SWITCH),
  $lottoBoard: document.querySelector(SELECTOR.LOTTO_BOARD),
  $lottoCnt: document.querySelector(SELECTOR.LOTTO_CNT),
});

lotto.bindEvents();
