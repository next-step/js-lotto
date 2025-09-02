import { generateRandomNumber } from "../utils/generateRandomNumber.js";

export class Lotto {
  static LOTTO_NUMBER_MIN = 1;
  static LOTTO_NUMBER_MAX = 45;
  static LOTTO_NUMBER_COUNT_MAX = 6;

  static validateLottoNumber(lottoNumber) {
    const lottoNumberSet = new Set(lottoNumber);

    if (lottoNumberSet.size !== Lotto.LOTTO_NUMBER_COUNT_MAX) {
      throw new Error(
        `로또 번호는 같은 숫자의 중복없이 ${Lotto.LOTTO_NUMBER_COUNT_MAX}개가 입력되어야 합니다.`
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
    const lottoNumber = [];

    while (lottoNumber.length < Lotto.LOTTO_NUMBER_COUNT_MAX) {
      const randomNumber = generateRandomNumber(
        Lotto.LOTTO_NUMBER_MIN,
        Lotto.LOTTO_NUMBER_MAX
      );

      if (lottoNumber.includes(randomNumber)) {
        continue;
      }

      lottoNumber.push(randomNumber);
    }

    Lotto.validateLottoNumber(lottoNumber);

    return lottoNumber.toSorted((a, b) => a - b);
  }
}
