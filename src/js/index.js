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

// * [확인] 버튼 클릭 시, 구매 금액만큼의 로또 티켓들을 생성한다.
const purchaseLottoTickets = () => {
  const $purchasePrice = Number(document.querySelector("#purchasePrice").value);
  const numberOfLottoTickets = Math.floor($purchasePrice / 1000);

  createLottoTickets(numberOfLottoTickets);
};

// * [확인] 버튼 - 이벤트 리스너 등록
$purchaseButton.addEventListener("click", purchaseLottoTickets);

//! 페이지 첫 로딩 시에는, 사용자에게 구입 금액을 입력하는 화면만 보여줘야 한다.
//! -> [확인] 버튼을 클릭했을 때 아래 화면이 나타나야 한다.
const $purchaseResult = document.querySelector("#purchaseResult");
$purchaseResult.style.display = "none";

const $confirmWinningNumbers = document.querySelector("#confirmWinningNumbers");
$confirmWinningNumbers.style.display = "none";
