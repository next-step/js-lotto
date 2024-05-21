/**
 * step 3의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */

import {
  LOTTO_3RD_PRIZE_WINNER,
  LOTTO_4TH_PRIZE_WINNER,
  LOTTO_5TH_PRIZE_WINNER,
  LOTTO_FIRST_PRIZE_WINNER,
  LOTTO_SECOND_PRIZE_WINNER,
} from "./constants";
import LottoConfirm from "./domain/LottoConfirm";
import LottoMachine from "./domain/LottoMachine";
import { countArrayResults, sortArray } from "./utils";

console.log("Web Browser!");

const confirmButton = document.getElementById("confirmButton");
const inputPrice = document.getElementById("price");
const toggleShowNumber = document.querySelector(".lotto-numbers-toggle-button");
const lottoNumbersDiv = document.querySelector(".lotto-numbers");
const purchaseMessage = document.getElementById("purchase_message");
const resultButton = document.querySelector(".open-result-modal-button");

const machine = new LottoMachine();
const lottoConfirm = new LottoConfirm();

let lottos = [];
let prices = 0;
let lottoResult = [];

function handleGetPrice() {
  const { value } = inputPrice;
}

function handleClickConfirm() {
  const { value } = inputPrice;
  lottos = machine.createLottos(value, "ASC", sortArray);
  prices = value;
  purchaseMessage.innerText = `${lottos.length}개 구매하였습니다.`;
}

function toggleLottoNumbers() {
  if (lottoNumbersDiv.style.display === "none") {
    lottoNumbersDiv.style.display = "block"; // 요소 보이기
    displayLottoTickets();
    return;
  }

  lottoNumbersDiv.style.display = "none"; // 요소 숨기기
  lottoNumbersDiv.innerHTML = "";
}

function displayLottoTickets() {
  lottoNumbersDiv.innerHTML = ""; // 기존 티켓을 지우고 새로 시작
  lottos.forEach((lotto) => {
    const div = document.createElement("div");
    div.className = "mx-1 text-4xl";
    div.textContent = `🎟️ ${lotto}`;
    lottoNumbersDiv.appendChild(div);
  });
}

function showResult() {
  const winningNumbers = [];
  const inputs = document.querySelectorAll(".winningNumbersWrapper input");
  const bonusInput = document.querySelector(".bonus-number");
  const winningTags = document.querySelectorAll(
    ".result-table tbody tr .winning"
  );

  const rateOfReturn = document.querySelector(".rateOfReturn");

  inputs.forEach((input) => {
    winningNumbers.push(input.value);
  });

  lottoConfirm.setWinningNumbers(winningNumbers);
  lottoConfirm.setBonusNumber(bonusInput.value);

  lottoResult = lottoConfirm.checkLottoWinning(lottos);
  const percent = lottoConfirm.returnsLottos(prices, lottoResult);

  console.log("checkedLottos", lottoResult);
  console.log("percent", percent);

  const result = [];

  function isConditon(targetValue) {
    return (item) => item.result === targetValue;
  }

  result.push(
    countArrayResults(lottoResult, isConditon(LOTTO_5TH_PRIZE_WINNER))
  );
  result.push(
    countArrayResults(lottoResult, isConditon(LOTTO_4TH_PRIZE_WINNER))
  );
  result.push(
    countArrayResults(lottoResult, isConditon(LOTTO_4TH_PRIZE_WINNER))
  );

  result.push(
    countArrayResults(lottoResult, isConditon(LOTTO_3RD_PRIZE_WINNER))
  );

  result.push(
    countArrayResults(lottoResult, isConditon(LOTTO_SECOND_PRIZE_WINNER))
  );

  result.push(
    countArrayResults(lottoResult, isConditon(LOTTO_FIRST_PRIZE_WINNER))
  );

  console.log("result", result);

  winningTags.forEach((td, index) => {
    td.innerText = result[index];
    index++;
  });

  rateOfReturn.innerText = `당신의 총 수익률은 ${percent}%입니다.`;
}

inputPrice.addEventListener("input", handleGetPrice);
confirmButton.addEventListener("click", handleClickConfirm);
resultButton.addEventListener("click", showResult);
toggleShowNumber.addEventListener("click", toggleLottoNumbers);
