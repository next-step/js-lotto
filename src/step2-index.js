import { LottoNumber } from "./domain/lotto-number.js";
import { LottoStore } from "./domain/lotto-store.js";
import { Lotto } from "./domain/lotto.js";
import { submitLottoPrice, submitWinningLotto } from "./view/input.web.js";
import { printLottoWeb, showWinningStatistics } from "./view/output.web.js";

window.addEventListener("load", async () => {
  let lottoStore;
  while (true) {
    try {
      const lottoPrice = await submitLottoPrice();
      lottoStore = new LottoStore(lottoPrice);
      break;
    } catch (error) {
      alert(error.message);
    }
  }
  const lottoList = lottoStore.sell();
  printLottoWeb(lottoList);

  let winningLotto;
  let bonusLottoNumber;
  while (true) {
    try {
      const { winningNumbers, bonusNumber } = await submitWinningLotto();
      winningLotto = new Lotto(winningNumbers);
      bonusLottoNumber = new LottoNumber(bonusNumber);
      lottoStore.validateBonusNumber(winningLotto, bonusLottoNumber);
      break;
    } catch (error) {
      alert(error.message);
    }
  }

  const rankList = lottoList.map((lotto) =>
    lotto.prize(winningLotto, bonusLottoNumber)
  );
  const rateOfReturn = lottoStore.rateOfReturn(rankList);

  showWinningStatistics(rankList, rateOfReturn);
});
