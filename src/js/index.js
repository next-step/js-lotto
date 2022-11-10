const $showResultButton = document.querySelector(".open-result-modal-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $lottoNumbersToggleButton = document.querySelector(".lotto-numbers-toggle-button");

const $paymentCost = document.querySelector("#payment-cost-input");
const $paymentButton = document.querySelector("#payment-button");
const $paymentForm = document.querySelector(".payment-form");

let paymentCostStr = "";

const $paymentTickets = document.querySelector("#payment-ticket");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

function blockComma() {
  if ($paymentCost.key === ",") {
    return false;
  }
}
function digitRange() {
  if (paymentCostStr % 1000 !== 0) {
    alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
  }
}

function lotteryIssuance() {
  return paymentCostStr / 1000;
}
function makeLottoByUser() {
  const number = lotteryIssuance();
  $paymentTickets.innerText = `총 ${number}개를 구매하였습니다.`;
}
function makeRandomLottoNumber() {
  let randomNumber = [];
  for (let i = 0; i < 6; i++) {
    randomNumber.push(Math.floor(Math.random() * 45 + 1));
  }
  return randomNumber;
}
function paymentCost() {
  paymentCostStr = $paymentCost.value;
  blockComma();
  digitRange();
  lotteryIssuance();
  makeLottoByUser();
  $paymentCost.focus();
  console.log(paymentCostStr);
  console.log(lotteryIssuance());
  console.log(`당첨번호 : ${makeRandomLottoNumber()}`);
}

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$paymentButton.addEventListener("click", paymentCost);
// submit이벤트여도 값이 넘어가야한다.
$paymentForm.addEventListener("submit", paymentCost);
