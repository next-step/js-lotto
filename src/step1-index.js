import {
  askRetry,
  askLottoPrice,
  askWinningLotto,
  askBonusNumber,
} from "./view/input.js";
import {
  printLotto,
  printRateOfReturn,
  printWinningStatistics,
} from "./view/output.js";

let playAgain = true;
while (playAgain) {
  const lottoStore = await askLottoPrice();
  const lottoList = lottoStore.sell();
  printLotto(lottoList);

  const winningLotto = await askWinningLotto();
  const bonusNumber = await askBonusNumber(lottoStore, winningLotto);
  const rankList = lottoList.map((lotto) =>
    lotto.prize(winningLotto, bonusNumber)
  );

  printWinningStatistics(rankList);
  printRateOfReturn(lottoStore.rateOfReturn(rankList));
  
  playAgain = await askRetry();
}
