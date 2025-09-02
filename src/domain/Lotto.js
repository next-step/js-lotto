import { generateRandomNumber } from "../utils/generateRandomNumber.js";

export class Lotto {
  static LOTTO_NUMBER_MIN = 1;
  static LOTTO_NUMBER_MAX = 45;
  static LOTTO_NUMBER_COUNT_MAX = 6;

  static validateLottoNumber(lottoNumber) {
    if (lottoNumber.length !== Lotto.LOTTO_NUMBER_COUNT_MAX) {
      throw new Error(
        `로또 번호는 ${Lotto.LOTTO_NUMBER_COUNT_MAX}개가 입력되어야 합니다.`
      );
    }

    if (!Lotto.isValidLottoNumber(lottoNumber)) {
      throw new Error(
        `로또 번호는 ${Lotto.LOTTO_NUMBER_MIN}~${Lotto.LOTTO_NUMBER_MAX}사이의 숫자만 입력할 수 있어요.`
      );
    }
  }

  static isValidLottoNumber(lottoNumber) {
    return lottoNumber.every(
      (number) =>
        number >= Lotto.LOTTO_NUMBER_MIN && number <= Lotto.LOTTO_NUMBER_MAX
    );
  }

  static issue() {
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
