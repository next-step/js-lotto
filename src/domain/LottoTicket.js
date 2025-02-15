import generateRandomNumber from "../utils/generateRandomNumber.js";
import isValueInArray from "../utils/isValueInArray.js";

class LottoTicket {
  constructor() {
    return this.makeLotto();
  }

  createLottoNumber(arr, number) {
    if (isValueInArray(arr, number)) {
      return this.createLottoNumber(arr, generateRandomNumber());
    }
    return number;
  }

  makeLotto() {
    return new Array(6)
      .fill(0)
      .reduce(
        (acc) => [...acc, this.createLottoNumber(acc, generateRandomNumber())],
        []
      );
  }
}

export default LottoTicket;
