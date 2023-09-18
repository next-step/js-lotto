import Lotto from "../Lotto";
import {
  BonusNumberNotNumberError,
  BonusNumberOutOfRangeError,
  BonusNumberDuplicatedError,
} from "./errors";
import { LOTTO_LOWER_BOUND, LOTTO_UPPER_BOUND, RANKS } from "../constants";
import Rank from "../Rank";

export default class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lottoNumbers, bonusNumber) {
    this.#lotto = Lotto.of(lottoNumbers);

    this.#validateBonusNumber(lottoNumbers, bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(lottoNumbers, bonusNumber) {
    if (typeof bonusNumber !== "number") throw new BonusNumberNotNumberError();
    if (bonusNumber < LOTTO_LOWER_BOUND || bonusNumber > LOTTO_UPPER_BOUND)
      throw new BonusNumberOutOfRangeError();
    if (lottoNumbers.includes(bonusNumber))
      throw new BonusNumberDuplicatedError();
  }

  getRank(targetLotto) {
    const winningLottoNumbers = this.#lotto.display();
    const targetLottoNumbers = targetLotto.display();

    const matchCount = winningLottoNumbers.filter((number) =>
      targetLottoNumbers.includes(number)
    ).length;
    const isBonusMatched = targetLottoNumbers.includes(this.#bonusNumber);

    let rank;
    switch (matchCount) {
      case 6:
        rank = RANKS.FIRST;
        break;
      case 5:
        if (isBonusMatched) rank = RANKS.SECOND;
        else rank = RANKS.SECOND;
        break;
      case 4:
        rank = RANKS.FOURTH;
        break;
      case 3:
        rank = RANKS.FIFTH;
        break;
      default:
        rank = RANKS.NONE;
        break;
    }

    return Rank.of(rank);
  }
}
