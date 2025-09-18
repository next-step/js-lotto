import { LottoNumber } from "./domain/lotto-number.js";
import { LottoStore } from "./domain/lotto-store.js";
import { Lotto } from "./domain/lotto.js";
import { onSubmitLottoPrice, onSubmitWinningLotto } from "./view/input.web.js";
import { printLottoWeb, showWinningStatistics } from "./view/output.web.js";

window.addEventListener("load", () => {
  let lottoStore;
  let lottoList = [];

  onSubmitLottoPrice((lottoPrice) => {
    lottoStore = new LottoStore(lottoPrice);
    lottoList = lottoStore.sell();
    printLottoWeb(lottoList);
  });

  onSubmitWinningLotto(({ winningNumbers, bonusNumber }) => {
    const winningLotto = new Lotto(winningNumbers);
    const bonusLottoNumber = new LottoNumber(bonusNumber);
    lottoStore.validateBonusNumber(winningLotto, bonusLottoNumber);

    const rankList = lottoList.map((lotto) =>
      lotto.prize(winningLotto, bonusLottoNumber)
    );
    const rateOfReturn = lottoStore.rateOfReturn(rankList);

    showWinningStatistics(rankList, rateOfReturn);
  });
});
