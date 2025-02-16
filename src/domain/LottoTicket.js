import generateRandomNumber from "../utils/generateRandomNumber.js";
import isValueInArray from "../utils/isValueInArray.js";

class LottoTicket {
  constructor() {}

  static createLottoNumber(arr) {
    const number = generateRandomNumber();
    if (isValueInArray(arr, number)) {
      return LottoTicket.createLottoNumber(arr);
    }
    return number;
  }

  static makeLotto() {
    return new Array(6)
      .fill(0)
      .reduce((acc) => [...acc, LottoTicket.createLottoNumber(acc)], [])
      .sort((a, b) => a - b);
  }
}

export default LottoTicket;
