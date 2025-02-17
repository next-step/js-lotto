import generateRandomNumber from "../../utils/generateRandomNumber.js";

class LottoTicket {
  constructor() {}

  static createLottoNumber(arr) {
    const number = generateRandomNumber();
    if (arr.includes(number)) return number;
  }

  static makeLotto() {
    return new Array(6)
      .fill(0)
      .reduce((acc) => [...acc, LottoTicket.createLottoNumber(acc)], [])
      .sort((a, b) => a - b);
  }
}

export default LottoTicket;
