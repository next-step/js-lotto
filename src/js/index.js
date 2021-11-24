import Lotto from "./lotto.js";

const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(
  ".lotto-numbers-toggle-button"
);

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

const lotto = new Lotto({
  $paymentForm: document.querySelector("#js-payment-form"),
  $payment: document.querySelector("#js-payment"),
  $confirmBtn: document.querySelector("#js-purchase-button"),
  $lottoNumbersToggleButton,
  $renderLotto: document.querySelector("#js-render-lotto"),
  $lottoCnt: document.querySelector("#js-lotto-count"),
});

lotto.bindEvents();
