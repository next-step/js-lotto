import { ErrorLotto } from "../constants/error";
import Prize from "./Prize";

class WinningLotto {
  winningLotto = [];
  bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#validationNumber(lotto, bonusNumber);

    this.winningLotto = lotto;
    this.bonusNumber = bonusNumber;
  }

  #validationNumber(lotto, bonusNumber) {
    if (lotto.containsLottoNumber(bonusNumber)) {
      throw new Error(ErrorLotto.BONUS_NUMBER_DUPLICATED);
    }
  }

  getResultPrize(lottoList) {
    const prizeList = lottoList.map((lotto) => {
      const matchCount = lotto.getMatchCount(this.winningLotto);
      const bonus = lotto.containsLottoNumber(this.bonusNumber);

      const prize = new Prize().findRank(matchCount, bonus);

      return prize;
    });

    return prizeList;
  }
}

export default WinningLotto;
