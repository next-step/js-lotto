import { LottoNumber } from "./domain/lotto-number.js";
import { LottoStore } from "./domain/lotto-store.js";
import { Lotto } from "./domain/lotto.js";
import { onSubmitLottoPrice, onSubmitWinningLotto } from "./view/input.web.js";
import { printLottoWeb, showWinningStatistics } from "./view/output.web.js";

window.addEventListener("load", () => {
  let lottoStore;
  let lottoList = [];

  onSubmitLottoPrice((lottoPrice) => {
    try {
      lottoStore = new LottoStore(lottoPrice);
    } catch (error) {
      alert(error.message);
      return;
    }

    lottoList = lottoStore.sell();
    printLottoWeb(lottoList);
  });

  onSubmitWinningLotto(({ winningNumbers, bonusNumber }) => {
    if (!lottoStore || lottoList.length === 0) {
      alert("로또를 구매해주세요.");
      return;
    }
    let winningLotto;
    let bonusLottoNumber;
    try {
      winningLotto = new Lotto(winningNumbers);
      bonusLottoNumber = new LottoNumber(bonusNumber);
      lottoStore.validateBonusNumber(winningLotto, bonusLottoNumber);
    } catch (error) {
      alert(error.message);
      return;
    }

    const rankList = lottoList.map((lotto) =>
      lotto.prize(winningLotto, bonusLottoNumber)
    );
    const rateOfReturn = lottoStore.rateOfReturn(rankList);

    showWinningStatistics(rankList, rateOfReturn);
  });
});
