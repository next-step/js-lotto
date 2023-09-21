import Lotto from "../Lotto/index.js";
import {
  LottoIsNotLottoInstanceError,
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

  static from(lotto, bonusNumber) {
    return new WinningLotto(lotto, bonusNumber);
  }

  constructor(lotto, bonusNumber) {
    this.#validateLottoInstance(lotto);
    this.#lotto = lotto;

    const winningLottoNumbers = lotto.display();
    this.#validateBonusNumber(winningLottoNumbers, bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateLottoInstance(lotto) {
    if (!(lotto instanceof Lotto)) throw new LottoIsNotLottoInstanceError();
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
