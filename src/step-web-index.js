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
const resetButton = document.getElementById("resetButton");

const machine = new LottoMachine();
const lottoConfirm = new LottoConfirm();

function handleClickConfirm() {
  const { value } = inputPrice;
  machine.createLottos(value, "ASC", sortArray);
  const lottos = machine.getLottos();

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
  machine.getLottos().forEach((lotto) => {
    const div = document.createElement("div");
    div.className = "mx-1 text-4xl";
    div.textContent = `🎟️ ${lotto}`;
    lottoNumbersDiv.appendChild(div);
  });
}

function showResult() {
  lottoConfirm.setWinningNumbers(handleGetWinningNumbers());
  lottoConfirm.setBonusNumber(handleGetBonusNumber());

  const lottoResult = lottoConfirm.checkLottoWinning(machine.getLottos());
  const percent = lottoConfirm.returnsLottos(inputPrice.value, lottoResult);
  const result = getLottoResults(lottoResult);

  writeLottosResult(result);
  writeLottoRateOfReturn(percent);
}

function handleGetWinningNumbers() {
  const winningNumbers = [];
  const inputs = document.querySelectorAll(".winningNumbersWrapper input");

  inputs.forEach((input) => {
    winningNumbers.push(Number(input.value));
  });

  return winningNumbers;
}

function handleResetWinningNumbers() {
  const inputs = document.querySelectorAll(".winningNumbersWrapper input");

  inputs.forEach((input) => {
    input.value = "";
  });
}
function handleGetBonusNumber() {
  const bonusInput = document.querySelector(".bonus-number");
  return bonusInput.value;
}

function handleResetBonusNumber() {
  const bonusInput = document.querySelector(".bonus-number");
  bonusInput.value = "";
}
function writeLottoRateOfReturn(percent) {
  const rateOfReturn = document.querySelector(".rateOfReturn");
  rateOfReturn.innerText = `당신의 총 수익률은 ${percent}%입니다.`;
}

function writeLottosResult(result) {
  const winningTags = document.querySelectorAll(
    ".result-table tbody tr .winning"
  );

  winningTags.forEach((td, index) => {
    td.innerText = result[index];
    index++;
  });
}

function getLottoResults(lottoResult) {
  const conditions = [
    LOTTO_5TH_PRIZE_WINNER,
    LOTTO_4TH_PRIZE_WINNER,
    LOTTO_3RD_PRIZE_WINNER,
    LOTTO_SECOND_PRIZE_WINNER,
    LOTTO_FIRST_PRIZE_WINNER,
  ];

  return conditions.map((condition) =>
    countArrayResults(lottoResult, (item) => item.result === condition)
  );
}

function resetLotto() {
  inputPrice.value = "";
  purchaseMessage.innerText = "";
  lottoNumbersDiv.style.display = "none";

  toggleShowNumber.checked = false;

  handleResetWinningNumbers();
  handleResetBonusNumber();
  machine.resetLottos();
  lottoConfirm.resetLottoConfrim();


}

confirmButton.addEventListener("click", handleClickConfirm);
resultButton.addEventListener("click", showResult);
toggleShowNumber.addEventListener("click", toggleLottoNumbers);
resetButton.addEventListener("click", resetLotto);

