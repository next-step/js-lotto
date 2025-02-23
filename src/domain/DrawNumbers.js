import LottoNumbers from "./LottoNumbers.js";

export default class DrawNumbers {
  static BONUS_NUMBER_COUNT = 1;

  winningNumbers;
  bonusNumber;

  constructor({
    winningNumbers,
    bonusNumber,
    min = LottoNumbers.NUMBER_MIN_RANGE,
    max = LottoNumbers.NUMBER_MAX_RANGE,
    count = LottoNumbers.LOTTO_SELECTION_COUNT,
    bonusNumberCount = DrawNumbers.BONUS_NUMBER_COUNT,
  }) {
    this.winningNumbers = new LottoNumbers({
      numbers: winningNumbers,
      min,
      max,
      count,
    });
    this.bonusNumber = new LottoNumbers({
      numbers: [bonusNumber],
      min,
      max,
      count: bonusNumberCount,
    });

    LottoNumbers.validateDuplication([...winningNumbers, bonusNumber]);
  }

  get values() {
    return {
      winningNumbers: [...this.winningNumbers.values],
      bonusNumber: this.bonusNumber.values,
    };
  }
}
