import {
  validateNumberCount,
  validateBonusNumberCount,
  validateNaturalNumber,
  validateNumberInRange,
  validateUniqueNumber,
} from "./LottoValidate";

export default class LottoChecker {
  #winningNumbers = [];
  #bonusNumbers = [];
  #prizeInfo = [];

  constructor(prizeInfo) {
    this.#prizeInfo = prizeInfo;
  }

  set lottoNumberInfo({ winningNumbers, bonusNumbers }) {
    const totalLottoNumbers = [...winningNumbers, ...bonusNumbers];
    validateNumberCount(winningNumbers);
    validateBonusNumberCount(bonusNumbers);

    totalLottoNumbers.forEach((number) => {
      validateNumberInRange(number);
      validateNaturalNumber(number);
    });

    validateUniqueNumber(totalLottoNumbers);

    this.#winningNumbers = winningNumbers;
    this.#bonusNumbers = bonusNumbers;
  }

  #prizeNumbersMap() {
    const prizeNumbers = [...this.#winningNumbers, ...this.#bonusNumbers];
    const prizeNumbersMap = new Array(Math.max(...prizeNumbers)).fill(0);

    this.#winningNumbers.forEach((number) => {
      prizeNumbersMap[number] = 1;
    });

    this.#bonusNumbers.forEach((number) => {
      prizeNumbersMap[number] = 2;
    });

    return prizeNumbersMap;
  }

  #checkLottoNumbers(lotto) {
    const prizeNumbersMap = this.#prizeNumbersMap();

    const correctNumbers = {
      correctWinningNumbers: [],
      correctBonusNumbers: [],
    };

    lotto.numbers.forEach((number) => {
      if (prizeNumbersMap[number] === 1) {
        correctNumbers.correctWinningNumbers.push(number);
      }

      if (prizeNumbersMap[number] === 2) {
        correctNumbers.correctBonusNumbers.push(number);
      }
    });

    return correctNumbers;
  }

  checkLotto(lotto) {
    if (!this.#winningNumbers.length || !this.#bonusNumbers.length) {
      throw new Error("당첨 번호와 보너스 번호를 설정해주세요.");
    }

    const { correctWinningNumbers, correctBonusNumbers } =
      this.#checkLottoNumbers(lotto);

    const correctWinningNumberLength = correctWinningNumbers.length;
    const correctBonusNumberLength = correctBonusNumbers.length;

    const result = this.#prizeInfo.find(
      (prize) =>
        prize.correctWinningNumberLength === correctWinningNumberLength &&
        prize.correctBonusNumberLength === correctBonusNumberLength
    );

    return {
      correctWinningNumbers,
      correctBonusNumbers,
      prizeInfo: result ?? null,
    };
  }
}
