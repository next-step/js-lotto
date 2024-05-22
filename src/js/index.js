import Lotto from "./domain/Lotto.js";
import LottoGame from "./domain/LottoGame.js";
import LottoMachine from "./domain/LottoMachine.js";
import LottoResult from "./domain/LottoResult.js";
import WinningLotto from "./domain/WinningLotto.js";

const $ = (selector) => document.querySelector(selector);
const $all = (selector) => document.querySelectorAll(selector);

const $showResultButton = $(".open-result-modal-button");
const $modalClose = $(".modal-close");
const $modal = $(".modal");

const winningNumberInputs = $all(".winning-number");
const $bonusNumberInput = $(".bonus-number");

const $purchasedLottosSection = $(".purchased-lottos-section");
const $purchasedLottosCount = $(".purchased-lottos-count");

const onRestartGame = () => {
  // hide modal
  onCloseModal();

  // reset game
  resetGame();
};

const showPurchasedLottosSection = () => {
  $purchasedLottosSection.classList.remove("d-none");
};

const hidePurchasedLottosSection = () => {
  $purchasedLottosSection.classList.add("d-none");
};

const resetPurchasedLottosSection = () => {
  // reset toggle button
  $lottoNumbersToggleButton.checked = false;
};

const $winningLottoForm = $(".winning-lotto-form");

const showWinningLottoForm = () => {
  $winningLottoForm.classList.remove("d-none");
};

const hideWinningLottoForm = () => {
  $winningLottoForm.classList.add("d-none");
};

const resetWinningLottoForm = () => {
  // reset winning number inputs
  winningNumberInputs.forEach((winningNumberInput) => {
    winningNumberInput.value = "";
  });

  // reset bonus number input
  $bonusNumberInput.value = "";
};

const resetPurchaeAmountInput = () => {
  $purchaseAmountInput.value = "";
};

const resetGame = () => {
  resetPurchaeAmountInput();

  hidePurchasedLottosSection();
  resetPurchasedLottosCount();

  hideWinningLottoForm();
  resetWinningLottoForm();
};

const $restartGameButton = $(".restart-game-button");
$restartGameButton.addEventListener("click", onRestartGame);

// get purchase amount from inupt
const $purchaseAmountInput = $(".purchase-amount-input");
let purchaseAmount = 0;

let lottos = [];

const onClickShowResult = (e) => {
  const isValidWinningNumbers = Array.from(winningNumberInputs).every(
    (winningNumberInput) => {
      return winningNumberInput.validity.valid;
    }
  );
  const isValidBonusNumber = $bonusNumberInput.validity.valid;

  if (!isValidWinningNumbers || !isValidBonusNumber) {
    return;
  }

  // prevent form submit
  e.preventDefault();

  const winningNumbers = Array.from(winningNumberInputs).map(
    (winningNumberInput) => winningNumberInput.value
  );
  const bonusNumber = $bonusNumberInput.value;

  try {
    const lotto = new Lotto(winningNumbers);
    const winningLotto = new WinningLotto(lotto, bonusNumber);
    const lottoResult = new LottoResult(winningLotto);
    showLottoResult(lottos, lottoResult);
  } catch (error) {
    alert(error.message);
  }
};

const showLottoResult = (lottos, lottoResult) => {
  // open modal
  $modal.classList.add("open");

  const winningCountElements = $all(".winning-count");
  const lottoRankings = [
    LottoResult.LottoRanking["FIFTH"],
    LottoResult.LottoRanking["FOURTH"],
    LottoResult.LottoRanking["THIRD"],
    LottoResult.LottoRanking["SECOND"],
    LottoResult.LottoRanking["FIRST"],
  ];

  lottoRankings.forEach((lottoRanking, index) => {
    const winningCountElement = winningCountElements[index];
    const winningCount = lottoResult.getLottoRankingCount(lottos, lottoRanking);
    winningCountElement.textContent = winningCount;
  });

  const totalWinningPrice = lottoResult.getTotalLottoWinningPrice(lottos);
  const totalProfitRate = LottoResult.getTotalLottoProfitRate(
    totalWinningPrice,
    purchaseAmount
  );

  const $profitRate = $("#profit-rate");
  $profitRate.textContent = totalProfitRate.toFixed(2);
};

const onCloseModal = () => {
  $modal.classList.remove("open");
};

let purchasableLottosCount = 0;
const $lottoNumbersToggleButton = $(".lotto-numbers-toggle-button");
const $lottoList = $(".lotto-list");

const generateLottoTemplate = (lottoNumbers, hideLottoNumbers) => {
  const lottoNumbersTextContent = lottoNumbers.join(", ");

  return /*HTML*/ `<li class="d-flex items-center">
<span class="mx-1 text-4xl">🎟️ </span>
<span class="lotto-numbers ${
    hideLottoNumbers ? "d-none" : ""
  }">${lottoNumbersTextContent}</span>
</li>`;
};

$lottoNumbersToggleButton.addEventListener("click", () => {
  const checked = $lottoNumbersToggleButton.checked;

  if (checked) {
    const lottoListTemplate = lottos.map((lotto) =>
      generateLottoTemplate(lotto.numbers, false)
    );

    $lottoList.innerHTML = lottoListTemplate.join("");

    // add flex-col class to lotto list
    $lottoList.classList.add("flex-col");
  } else {
    // hide lotto numbers
    const lottoListTemplate = lottos.map((lotto) =>
      generateLottoTemplate(lotto.numbers, true)
    );

    $lottoList.innerHTML = lottoListTemplate.join("");

    // remove flex-col class to lotto list
    $lottoList.classList.remove("flex-col");
  }
});

const onPurchaseLotto = () => {
  try {
    purchaseAmount = Number($purchaseAmountInput.value);

    purchasableLottosCount = LottoGame.getPurchasableLottoCount(purchaseAmount);

    lottos = generateLottos(purchasableLottosCount);

    // show purchased lottos
    showPurchasedLottos(lottos);

    // show winning lotto form
    showWinningLottoForm();
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};

const showPurchasedLottos = (lottos) => {
  showPurchasedLottosSection();

  // update purchased lotto count
  const purchasedLottosCountLabelContent = lottos.length;
  $purchasedLottosCount.textContent = purchasedLottosCountLabelContent;

  const lottoListTemplate = lottos.map((lotto) =>
    generateLottoTemplate(lotto.numbers, true)
  );

  $lottoList.innerHTML = lottoListTemplate.join("");
};

const generateLottos = (lottosCount) => {
  const lottos = [];
  for (let i = 0; i < lottosCount; i++) {
    const lotto = LottoMachine.generateRandomLotto();
    lottos.push(lotto);
  }

  return lottos;
};

const $purchaseButton = $(".purchase-button");
$purchaseButton.addEventListener("click", onPurchaseLotto);

$showResultButton.addEventListener("click", onClickShowResult);
$modalClose.addEventListener("click", onCloseModal);
