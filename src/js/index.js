import { $, $$ } from "./Util/DOM.js";

const $showResultButton = $(".open-result-modal-button");
const $modalClose = $(".modal-close");
const $modal = $(".modal");
const $lottoNumbersToggleButton = $(".lotto-numbers-toggle-button");
const $paymentCost = $("#payment-cost-input");
const $paymentButton = $("#payment-button");
const $paymentForm = $(".payment-form");
const $paymentTickets = $("#payment-ticket");

let paymentCostStr = "";

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

function showLottoNumber(ticket) {
  const lottoResult = $(".lotto-result");
  while (lottoResult.hasChildNodes()) {
    lottoResult.removeChild(lottoResult.firstChild);
  }
  for (let i = 0; i < ticket.length; i++) {
    const li = document.createElement("li");
    li.className = "d-flex flex-wrap lotto-wrap";

    const img = document.createElement("span");
    img.className = "mx-1 text-4xl lotto-result-list-item";
    img.innerText = "🎟️";

    const ticketNumber = document.createElement("span");
    ticketNumber.classList = "lotto-ticket-number";
    ticketNumber.style = "display: none";
    ticketNumber.innerText = ticket[i];

    lottoResult.appendChild(li);
    li.appendChild(img);
    li.appendChild(ticketNumber);
  }

  return lottoResult;
}

function blockComma() {
  if ($paymentCost.key === ",") {
    return false;
  }
}
function validatePaymentInput() {
  if (paymentCostStr % 1000 !== 0) {
    alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
    $paymentCost.value = "";
    return false;
  }
  return true;
}

function lotteryIssuance() {
  return paymentCostStr / 1000;
}
function makeLottoByUser() {
  const number = lotteryIssuance();
  $paymentTickets.innerText = `총 ${number}개를 구매하였습니다.`;
}

function makeRandomLottoNumber() {
  let lottoNumber = [];
  let i = 0;
  while (i < 6) {
    const randomNumber = Math.floor(Math.random() * 45 + 1);
    if (!isDuplicated(randomNumber)) {
      lottoNumber.push(randomNumber);
      i++;
    }
  }
  function isDuplicated(n) {
    for (let i = 0; i < 6; i++) {
      if (n === lottoNumber[i]) {
        return true;
      }
    }
    return false;
  }
  return lottoNumber;
}

function makeTicket() {
  let tickets = [];
  for (let i = 0; i < lotteryIssuance(); i++) {
    tickets.push(makeRandomLottoNumber());
  }
  return tickets;
}

function clickLottoNumberToggleButton() {
  const toggleSwitch = $(".lotto-numbers-toggle-button");
  const ul = $$(".lotto-result");
  const ticketNumber = $$(".lotto-ticket-number");
  if (toggleSwitch.checked === true) {
    for (let i = 0; i < ul.length; i++) {
      ul[i].className = "d-flex flex-wrap flex-col lotto-result";
    }
    for (let i = 0; i < ticketNumber.length; i++) {
      ticketNumber[i].style.display = "inline";
    }
  } else {
    for (let i = 0; i < ul.length; i++) {
      ul[i].className = "d-flex flex-wrap lotto-result";
    }
    for (let i = 0; i < ticketNumber.length; i++) {
      ticketNumber[i].style.display = "none";
    }
  }
}

function handlePayment() {
  paymentCostStr = $paymentCost.value;
  if (validatePaymentInput() === true) {
    blockComma();
    validatePaymentInput();
    lotteryIssuance();
    makeLottoByUser();
    $paymentCost.focus();
    showLottoNumber(makeTicket());
  }
  paymentCostStr = 0;
}

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$paymentButton.addEventListener("click", handlePayment);
$paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handlePayment();
});
$lottoNumbersToggleButton.addEventListener("click", clickLottoNumberToggleButton);
