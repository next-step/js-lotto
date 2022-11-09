const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(".lotto-numbers-toggle-button");

const $paymentCost = document.querySelector("#payment-cost");
const $paymentButton = document.querySelector("#payment-button");
const $paymentForm = document.querySelector(".payment-form");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};
function paymentCost() {
  // console.log($paymentCost.value);
  $paymentCost.value;
  $paymentCost.focus();
}
$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$paymentButton.addEventListener("click", paymentCost);
// submit이벤트여도 값이 넘어가야한다.
$paymentForm.addEventListener("submit", paymentCost);
