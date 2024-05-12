import {
  validateNumberCount,
  validateNaturalNumber,
  validateNumberInRange,
  validateUniqueNumber,
} from "./LottoValidate";

export default class LottoChecker {
  #winningNumbers = [];
  #bonusNumber;
  #prizeInfo = [];

  constructor(prizeInfo) {
    this.#prizeInfo = prizeInfo;
  }

  set lottoNumberInfo({ winningNumbers, bonusNumber }) {
    const totalLottoNumbers = [...winningNumbers, bonusNumber];
    validateNumberCount(winningNumbers);

    totalLottoNumbers.forEach((number) => {
      validateNumberInRange(number);
      validateNaturalNumber(number);
    });

    validateUniqueNumber(totalLottoNumbers);

    this.#winningNumbers = winningNumbers;
    this.#bonusNumber = bonusNumber;
  }

  #prizeNumbersMap() {
    const prizeNumbers = [...this.#winningNumbers, this.#bonusNumber];
    const prizeNumbersMap = new Array(Math.max(...prizeNumbers)).fill(0);

    this.#winningNumbers.forEach((number) => {
      prizeNumbersMap[number] = 1;
    });

    prizeNumbersMap[this.#bonusNumber] = 2;

    return prizeNumbersMap;
  }

  #checkLottoNumbers(lotto) {
    const prizeNumbersMap = this.#prizeNumbersMap();

    const matchedNumbers = {
      matchedWinningNumbers: [],
      isBonusNumberMatched: false,
    };

    lotto.numbers.forEach((number) => {
      if (prizeNumbersMap[number] === 1) {
        matchedNumbers.matchedWinningNumbers.push(number);
      }

      if (prizeNumbersMap[number] === 2) {
        matchedNumbers.isBonusNumberMatched = true;
      }
    });

    return matchedNumbers;
  }

  #findMatchedPrize(matchedWinningNumbers, isBonusNumberMatched) {
    return this.#prizeInfo.find((prize) => {
      if (matchedWinningNumbers.length === prize.matchingNumberCount) {
        if (prize.bonusAffectsWinning) {
          return isBonusNumberMatched;
        }

        return true;
      }
    });
  }

  #validateCheckSetNumbers() {
    if (!this.#winningNumbers.length) {
      throw new Error("당첨 번호를 설정해주세요.");
    }

    if (!this.#bonusNumber) {
      throw new Error("보너스 번호를 설정해주세요.");
    }
  }

  checkLotto(lotto) {
    this.#validateCheckSetNumbers();

    const { matchedWinningNumbers, isBonusNumberMatched } =
      this.#checkLottoNumbers(lotto);

    const prize = this.#findMatchedPrize(
      matchedWinningNumbers,
      isBonusNumberMatched
    );

    return {
      matchedWinningNumbers,
      isBonusNumberMatched,
      prize,
    };
  }
}
