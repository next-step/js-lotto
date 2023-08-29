import { dataStorage } from "./data.js";
import {
  validateBonusNumber,
  validateLottoDuplicateNumbers,
  validateLottoLength,
  validateLottoNumber,
} from "./validator.js";

// machine: winner number, bonus number
export const Machine = {
  /**
   * @param {string} inputWinNumbers
   * @returns {number[]} - 당첨 로또 번호 리스트
   */
  getWinnerLottoList(inputWinNumbers) {
    const numberList = inputWinNumbers.split(",").map(numStr => {
      const num = Number(numStr);
      validateLottoNumber(num);

      return num;
    });

    validateLottoLength(numberList);
    validateLottoDuplicateNumbers(numberList);

    dataStorage.winNumbers = numberList;

    return dataStorage.winNumbers;
  },

  getBonusNumber(winNumbers, bonusNumberStr) {
    const bonusNumber = Number(bonusNumberStr);

    validateLottoNumber(bonusNumber);
    validateBonusNumber(winNumbers, bonusNumber);

    dataStorage.bonusNumber = bonusNumber;

    return dataStorage.bonusNumber;
  },
};
