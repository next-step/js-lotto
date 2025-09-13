import { LottoNumber } from "./domain/lotto-number.js";
import { findLottoRankCount } from "./domain/lotto-rank.js";
import { LottoStore } from "./domain/lotto-store.js";
import { Lotto } from "./domain/lotto.js";
import { submitLottoPrice, submitWinningLotto } from "./view/input.web.js";
import { printLottoWeb, showWinningStatistics } from "./view/output.web.js";

window.addEventListener("load", async () => {
  const lottoPrice = await submitLottoPrice();

  const lottoStore = new LottoStore(lottoPrice);
  const lottoList = lottoStore.sell();

  printLottoWeb(lottoList);

  const { winningNumbers, bonusNumber } = await submitWinningLotto();
  const winningLotto = new Lotto(winningNumbers);
  const bonusLottoNumber = new LottoNumber(bonusNumber);
  lottoStore.validateBonusNumber(winningLotto, bonusLottoNumber);

  const rankList = lottoList.map((lotto) =>
    lotto.prize(winningLotto, bonusLottoNumber)
  );
  const rateOfReturn = lottoStore.rateOfReturn(rankList);

  showWinningStatistics(rankList, rateOfReturn);
});
