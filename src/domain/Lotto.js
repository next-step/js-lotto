import { generateRandomNumber } from "../utils/generateRandomNumber.js";

export class Lotto {
  static LOTTO_NUMBER_MIN = 1;
  static LOTTO_NUMBER_MAX = 45;
  static LOTTO_NUMBER_COUNT_MAX = 6;

  issue() {
    const lottoNumbers = [];

    while (lottoNumbers.length < Lotto.LOTTO_NUMBER_COUNT_MAX) {
      const randomNumber = generateRandomNumber(
        Lotto.LOTTO_NUMBER_MIN,
        Lotto.LOTTO_NUMBER_MAX
      );

      if (lottoNumbers.includes(randomNumber)) {
        continue;
      }

      lottoNumbers.push(randomNumber);
    }

    return lottoNumbers.toSorted((a, b) => a - b);
  }
}
