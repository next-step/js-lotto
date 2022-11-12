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

function showLottoNumber(ticket) {
  const lottoResult = document.querySelector(".lotto-result");
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
function digitRange() {
  if (paymentCostStr % 1000 !== 0) {
    alert("로또 구입 금액을 1,000원 단위로 입력해 주세요.");
    $paymentCost.value = "";
    return;
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
function clickToggle() {
  const toggleSwitch = document.querySelector(".lotto-numbers-toggle-button");
  if (toggleSwitch.checked === true) {
    const ul = document.querySelectorAll(".lotto-result");
    const ticketNumber = document.querySelectorAll(".lotto-ticket-number");
    for (let i = 0; i < ul.length; i++) {
      ul[i].className = "d-flex flex-wrap flex-col lotto-result";
    }
    for (let i = 0; i < ticketNumber.length; i++) {
      ticketNumber[i].style.display = "inline";
    }
  } else {
    const ul = document.querySelectorAll(".lotto-result");
    const ticketNumber = document.querySelectorAll(".lotto-ticket-number");
    for (let i = 0; i < ul.length; i++) {
      ul[i].className = "d-flex flex-wrap lotto-result";
    }
    for (let i = 0; i < ticketNumber.length; i++) {
      ticketNumber[i].style.display = "none";
    }
  }
}

function paymentCost() {
  paymentCostStr = $paymentCost.value;
  blockComma();
  digitRange();
  lotteryIssuance();
  makeLottoByUser();
  $paymentCost.focus();
  showLottoNumber(makeTicket());
}

$showResultButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$paymentButton.addEventListener("click", paymentCost);
$paymentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  paymentCost();
});
$lottoNumbersToggleButton.addEventListener("click", clickToggle);
