const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(".lotto-numbers-toggle-button");
const $paymentCost = document.querySelector("#payment-cost");
const $paymentButton = document.querySelector("#payment-button");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};
const paymentCost = (e) => {
  console.log($paymentCost.value);
};
$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$paymentButton.addEventListener("click", paymentCost);
