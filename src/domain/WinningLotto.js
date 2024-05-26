import { ErrorLotto } from "../constants/error";
import Prize from "./Prize";

class WinningLotto {
  number = [];
  bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#validationNumber(lotto, bonusNumber);

    this.number = lotto;
    this.bonusNumber = bonusNumber;
  }

  #validationNumber(lotto, bonusNumber) {
    if (lotto.isIncludeLottoNumber(bonusNumber)) {
      throw new Error(ErrorLotto.BONUS_NUMBER_DUPLICATED);
    }
  }

  getResultPrize(lottoList) {
    const prizeList = lottoList.map((lotto) => {
      const matchCount = lotto.getMatchCount(this.number);
      const bonus = lotto.isIncludeLottoNumber(this.bonusNumber);

      const prize = new Prize().findRank(matchCount, bonus);

      return prize;
    });

    return prizeList;
  }
}

export default WinningLotto;
