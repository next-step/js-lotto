import { createLottoTickets } from "./LottoApp.js";

const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(".lotto-numbers-toggle-button");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

// * [확인] 버튼
const $purchaseButton = document.querySelector("#purchaseButton");

const purchaseLottoTickets = () => {
  const $purchasePrice = Number(document.querySelector("#purchasePrice").value);
  const numberOfLottoTickets = Math.floor($purchasePrice / 1000);

  createLottoTickets(numberOfLottoTickets);
};

// * [확인] 버튼 - 이벤트 리스너 등록
$purchaseButton.addEventListener("click", purchaseLottoTickets);
