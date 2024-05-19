import LottoGame from "./js/domain/lotto-game/lotto-game.model.js";
import LottoGameView from "./js/domain/lotto-game/lotto-game.view.js";
import LottoSales from "./js/domain/lotto-sales/lotto-sales.model.js";
import LottoSalesView from "./js/domain/lotto-sales/lotto-sales.view.js";

async function app() {
  let isRestart = true;

  const lottoGameView = new LottoGameView();
  const lottoSalesView = new LottoSalesView();

  const lottoSales = new LottoSales();

  while (isRestart) {
    const purchaseAmount = await lottoSalesView.inputPurchaseAmount();
    const lottos = lottoSales.purchase(purchaseAmount);

    lottoSalesView.printPurchaseResult(lottos);

    const winningNumbers = await lottoGameView.inputWinningNumbers();
    const bonusNumber = await lottoGameView.inputBonusNumber(winningNumbers);

    const lottoGame = new LottoGame(winningNumbers, bonusNumber);

    lottoGame.check(lottos);

    const statistics = lottoGame.statistics;
    const ratio = lottoGame.ratio();

    lottoGameView.printStatistics(statistics);
    lottoGameView.printRatio(ratio);

    isRestart = await lottoGameView
      .inputRestart()
      .then((input) => input === "y");
  }
}

app();
