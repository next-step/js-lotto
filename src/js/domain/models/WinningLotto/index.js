import Lotto from "../Lotto/index.js";
import {
  BonusNumberNotNumberError,
  BonusNumberOutOfRangeError,
  BonusNumberDuplicatedError,
} from "./errors.js";
import {
  LOTTO_LOWER_BOUND,
  LOTTO_UPPER_BOUND,
  RANKS,
} from "../../constants.js";
import Rank from "../Rank/index.js";

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

  #getRankFromMatchInfo(matchCount, isBonusMatch) {
    switch (matchCount) {
      case 6:
        return RANKS.FIRST;
      case 5:
        if (isBonusMatch) return RANKS.SECOND;
        return RANKS.SECOND;
      case 4:
        return RANKS.FOURTH;
      case 3:
        return RANKS.FIFTH;
      default:
        return RANKS.NONE;
    }
  }

  getRank(targetLotto) {
    const winningLottoNumbers = this.#lotto.display();
    const targetLottoNumbers = targetLotto.display();

    const matchCount = winningLottoNumbers.filter((number) =>
      targetLottoNumbers.includes(number)
    ).length;
    const isBonusMatch = targetLottoNumbers.includes(this.#bonusNumber);

    const rank = this.#getRankFromMatchInfo(matchCount, isBonusMatch);
    return Rank.of(rank);
  }
}
