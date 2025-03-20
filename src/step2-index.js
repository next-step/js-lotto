import LottoGame from "./domain/LottoGame.js";
import LottoPrizes from "./domain/LottoPrizes.js";
import DrawNumbers from "./domain/DrawNumbers.js";
import WinningNumbers from "./domain/WinningNumbers.js";
import BonusNumbers from "./domain/BonusNumbers.js";

import {
  handlePurchaseFormSubmit,
  handleDrawNumbersFormSubmit,
  resetForms,
} from "./view/web/input-controller.js";
import {
  updatePurchasedResultView,
  openResultModal,
  resetPurchaseResult,
} from "./view/web/output-controller.js";

function purchaseLottos(lottoGame, purchaseAmount) {
  const purchasedLottos = lottoGame.purchase(purchaseAmount);
  const quantity = purchasedLottos.length;
  updatePurchasedResultView(quantity, purchasedLottos);
}

function drawLottos(lottoGame, winningNumbers, bonusNumbers) {
  const drawNumbers = new DrawNumbers({
    winningNumbers: new WinningNumbers({ numbers: winningNumbers }),
    bonusNumbers: new BonusNumbers({ numbers: bonusNumbers }),
  });

  return lottoGame.draw(drawNumbers);
}

function resetGame() {
  const newGame = new LottoGame(new LottoPrizes());
  resetForms();
  resetPurchaseResult();
  return newGame;
}

function showResults(rate, results) {
  openResultModal({
    rate,
    results,
    onClick: resetGame,
  });
}

function initializeGame() {
  let lottoGame = new LottoGame(new LottoPrizes());

  handlePurchaseFormSubmit({
    onSubmit: (purchaseAmount) => () =>
      purchaseLottos(lottoGame, purchaseAmount),
  });

  handleDrawNumbersFormSubmit({
    onSubmit: (winningNumbers, bonusNumbers) => () => {
      const results = drawLottos(lottoGame, winningNumbers, bonusNumbers);
      const rate = lottoGame.getReturnRate();
      showResults(rate, results);
    },
  });
}

window.addEventListener("load", initializeGame);
