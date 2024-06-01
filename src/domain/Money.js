import { ErrorLotto } from "../constants/error";

class Money {
  #money;
  constructor(inputMoney) {
    this.#validationMoney(inputMoney);

    this.#money = inputMoney;
  }

  #validationMoney(inputMoney) {
    const regex = /^[0-9]*$/;
    if (!regex.test(inputMoney)) {
      throw new Error(ErrorLotto.CHECK_AMOUNT_PRICE_NOT_TEXT);
    }
  }

  get money() {
    return this.#money;
  }
}

export default Money;
