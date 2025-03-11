import AbstractLottoNumbers from "./AbstractLottoNumbers.js";

export default class BonusNumbers extends AbstractLottoNumbers {
  static BONUS_NUMBER_COUNT = 1;

  constructor({ numbers, min, max, count = BonusNumbers.BONUS_NUMBER_COUNT }) {
    super({
      numbers,
      min,
      max,
      count,
    });
  }
}
