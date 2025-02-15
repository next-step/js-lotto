import generateRandomNumber from "../utils/generateRandomNumber.js";
import isValueInArray from "../utils/isValueInArray.js";
class Lotto {
  #price;

  #ticket = [];

  constructor(price) {
    this.#price = price;
    this.#ticket = this.makeLottoList(this.getTicketAmount());
  }

  get price() {
    return this.#price;
  }

  getTicketAmount() {
    return this.#price / 1000;
  }

  getLottoTicket() {
    return this.#ticket;
  }

  createLottoNumber(arr, number) {
    if (isValueInArray(arr, number)) {
      return this.createLottoNumber(arr, generateRandomNumber());
    }
    return number;
  }

  makeLottoList(length) {
    return new Array(length)
      .fill()
      .map(() => this.makeLotto())
      .sort((a, b) => a - b);
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

export default Lotto;
