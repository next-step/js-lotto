import Lotto from "./js/domain/Lotto.js";
import LottoShop from "./js/domain/LottoShop.js";
import LottoMachine from "./js/domain/LottoMachine.js";
import LottoRanking from "./js/domain/LottoRanking.js";
import WinningLotto from "./js/domain/WinningLotto.js";
import LottoListSection from "./js/view/web/LottoListSection.js";
import LottoRankingModal from "./js/view/web/LottoRankingModal.js";
import PurchaseAmountInputForm from "./js/view/web/PurchaseAmountInputForm.js";
import WinningLottoForm from "./js/view/web/WinningLottoForm.js";
import { $ } from "./utils/dom.js";

let purchasedAmount;
const lottos = [];

// 로또 게임 초기화
const initializeLottoGame = () => {
  purchasedAmount = PurchaseAmountInputForm.inputValue();
  const purchasableLottosCount =
    LottoShop.getPurchasableLottoCount(purchasedAmount);
  const purchasedLottos = LottoMachine.generateRandomLottos(
    purchasableLottosCount
  );

  // delete all lottos
  lottos.splice(0, lottos.length);
  lottos.push(...purchasedLottos);
};

// 구매 금액 입력
const onSubmitPurchaseAmount = (e) => {
  const inputValidated = PurchaseAmountInputForm.isValidInput();
  if (!inputValidated) {
    return;
  }

  e.preventDefault();

  try {
    initializeLottoGame();
    LottoListSection.show(lottos);
    WinningLottoForm.show();
  } catch (error) {
    alert(error.message);
  }
};

PurchaseAmountInputForm.addEventListener(
  PurchaseAmountInputForm.elements.PURCHASE_AMOUNT_INPUT,
  "keydown",
  PurchaseAmountInputForm.handlePurchaseAmountInputFormEnterPressed,
  onSubmitPurchaseAmount
);

PurchaseAmountInputForm.elements.PURCHASE_BUTTON.addEventListener(
  "click",
  onSubmitPurchaseAmount
);

PurchaseAmountInputForm.addEventListener(
  PurchaseAmountInputForm.elements.PURCHASE_AMOUNT_INPUT,
  "blur",
  PurchaseAmountInputForm.handlePurchaseAmountInputFormBlur
);

// 구매한 로또 목록
const onToggleShowLottoNumbers = () => {
  LottoListSection.toggleLottoNumbers(lottos);
};

LottoListSection.elements.LOTTO_LIST_TOGGLE_BUTTON.addEventListener(
  "click",
  onToggleShowLottoNumbers
);

// 결과 확인하기
const onClickShowRanking = (e) => {
  const winningNumbersValidated = WinningLottoForm.isValidWinningNumbers();
  const bonusNumberValidated = WinningLottoForm.isValidBonusNumber();

  if (!winningNumbersValidated || !bonusNumberValidated) {
    return;
  }

  // prevent form submit
  e.preventDefault();

  const winningNumbers = WinningLottoForm.winningNumbers();
  const bonusNumber = WinningLottoForm.bonusNumber();

  try {
    const lotto = new Lotto(winningNumbers);
    const winningLotto = new WinningLotto(lotto, bonusNumber);
    const lottoRanking = new LottoRanking(winningLotto);

    LottoRankingModal.open();
    LottoRankingModal.render(purchasedAmount, lottos, lottoRanking);
  } catch (error) {
    alert(error.message);
  }
};

WinningLottoForm.addEventListeners(
  WinningLottoForm.elements.WINNING_NUMBER_INPUTS,
  "input",
  WinningLottoForm.handleWinningNumberInput
);

WinningLottoForm.addEventListeners(
  WinningLottoForm.elements.WINNING_NUMBER_INPUTS,
  "change",
  WinningLottoForm.handleWinningNumberInputChange
);

WinningLottoForm.addEventListeners(
  WinningLottoForm.elements.BONUS_NUMBER_INPUT,
  "input",
  WinningLottoForm.handleBonusNumberInput
);

WinningLottoForm.addEventListeners(
  WinningLottoForm.elements.BONUS_NUMBER_INPUT,
  "change",
  WinningLottoForm.handleBonusNumberInputChange
);

const $showResultButton = $(".open-result-modal-button");
$showResultButton.addEventListener("click", onClickShowRanking);

LottoRankingModal.elements.CLOSE_BUTTON.addEventListener(
  "click",
  LottoRankingModal.close.bind(LottoRankingModal)
);

LottoRankingModal.elements.MODAL.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    LottoRankingModal.close();
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (LottoRankingModal.elements.MODAL.classList.contains("open")) {
      LottoRankingModal.close();
    }
  }
});

// 게임 다시 시작하기
const onRestartGame = () => {
  LottoRankingModal.close();
  PurchaseAmountInputForm.reset();
  LottoListSection.hide();
  LottoListSection.reset(lottos);
  WinningLottoForm.hide();
  WinningLottoForm.reset();
};

const $restartGameButton = $(".restart-game-button");
$restartGameButton.addEventListener("click", onRestartGame);
