/**
 * step 3의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
import "./css/index.css";
import "./js/index";
import {
  buyLottos,
  calculateProfitRate,
  getLottoRanks,
} from "./js/domain/LottoService";
import { LottoStats } from "./js/domain/LottoStats";
import { LottoRank } from "./js/domain/enum/LottoRank";
import { onModalShow } from "./js/index";

const $buyButton = document.getElementById("buyButton");
const $moneyInput = document.getElementById("moneyInput");
const $totalCountLabel = document.getElementById("totalCountLabel");
const $lottosDiv = document.getElementById("lottosDiv");
const $numbersToggle = document.getElementById("numbersToggle");
const $winningNumberInputs = document.getElementsByClassName("winning-number");
const $bonusNumberInput = document.getElementsByClassName("bonus-number")[0];
const $resultButton = document.getElementById("resultButton");

const $fifthRankCountSpan = document.getElementById("fifthRankCount");
const $fourthRankCountSpan = document.getElementById("fourthRankCount");
const $thirdRankCountSpan = document.getElementById("thirdRankCount");
const $secondRankCountSpan = document.getElementById("secondRankCount");
const $firstRankCountSpan = document.getElementById("firstRankCount");
const $profitRateSpan = document.getElementById("profitRate");

const $restartButton = document.getElementById("restartButton");

let lottos = null;

$buyButton.addEventListener("click", buyLottosEvent);

$moneyInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    buyLottosEvent();
  }
});

$numbersToggle.addEventListener("change", (event) => {
  const display = event.currentTarget.checked ? "" : "none";
  $lottosDiv.style.display = display;
});

$resultButton.addEventListener("click", showLottoStats);

[...$winningNumberInputs].forEach((e) => {
  e.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      showLottoStats();
    }
  });
});

$bonusNumberInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    showLottoStats();
  }
});

$restartButton.addEventListener("click", () => location.reload());

function buyLottosEvent() {
  try {
    const money = getMoney();
    lottos = buyLottos(money);
    setTotalCountLabel(lottos.length);
    setLottosDiv(lottos.map((e) => e.numbers));
    $winningNumberInputs[0].focus();
  } catch (err) {
    alert(err.message);
  }
}

function showLottoStats() {
  try {
    const winningNumbers = getWinningNumbers();
    const bonusNumber = getBonusNumber();

    const lottoRanks = getLottoRanks(lottos, winningNumbers, bonusNumber);

    const { rankCount, totalCount, totalReward } = new LottoStats(lottoRanks);

    $fifthRankCountSpan.innerHTML = rankCount.get(LottoRank.FIFTH.rank) ?? 0;
    $fourthRankCountSpan.innerHTML = rankCount.get(LottoRank.FOURTH.rank) ?? 0;
    $thirdRankCountSpan.innerHTML = rankCount.get(LottoRank.THIRD.rank) ?? 0;
    $secondRankCountSpan.innerHTML = rankCount.get(LottoRank.SECOND.rank) ?? 0;
    $firstRankCountSpan.innerHTML = rankCount.get(LottoRank.FIRST.rank) ?? 0;

    const profitRate = calculateProfitRate(totalCount, totalReward);
    $profitRateSpan.innerHTML = profitRate;

    onModalShow();
  } catch (err) {
    alert(err.message);
  }
}

function getWinningNumbers() {
  return [...$winningNumberInputs].map((e) => parseInt(e.value));
}

function getBonusNumber() {
  return parseInt($bonusNumberInput.value);
}

function getMoney() {
  return parseInt($moneyInput.value);
}

function setTotalCountLabel(length) {
  $totalCountLabel.innerHTML = `총 ${length}개를 구매하였습니다.`;
}

function setLottosDiv(numbersList) {
  const spans = numbersList.map(generateLottoNumbersSpan);
  $lottosDiv.replaceChildren(...spans);
}

function generateLottoNumbersSpan(numbers) {
  const span = document.createElement("span");
  span.classList.add("mx-1");
  span.classList.add("text-4xl");
  span.value = numbers;
  span.innerHTML = `🎟️ ${numbers}`;
  return span;
}
