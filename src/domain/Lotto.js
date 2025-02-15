import { LOTTO_RULES, RULES } from "../util/rule.js";

class Lotto {
  #purchasePrice;

  #winningNumber;

  #bonusNumber;

  #countOfTickets;

  get getCountOfTickets() {
    return this.#countOfTickets;
  }

  setCountOfTickets() {
    this.#countOfTickets = Math.floor(this.#purchasePrice / RULES.TICKET_PRICE);
  }

  constructor({ purchasePrice, winningNumber, bonusNumber }) {
    this.#setpurchasePrice(
      purchasePrice,
      LOTTO_RULES.purChasePriceRule,
      "잘못된 구입금액 설정입니다.",
    );
    winningNumber &&
      this.setWinningNumber(
        winningNumber,
        LOTTO_RULES.winningNumberRule,
        "잘못된 당첨번호 설정입니다.",
      );
    bonusNumber &&
      this.setBonusNumber(
        bonusNumber,
        LOTTO_RULES.bonusNumberRule,
        "잘못된 보너스 번호 설정입니다.",
      );
    // this.#setCountOfTickets();
  }

  #setpurchasePrice(purchasePrice, predicate, errorMessage) {
    if (predicate(purchasePrice) === false) {
      throw new Error(errorMessage);
    }
    this.#purchasePrice = purchasePrice;
  }

  get getPurchasePrice() {
    return this.#purchasePrice;
  }

  setWinningNumber(winningNumber, predicate, errorMessage) {
    if (predicate(winningNumber) === false) {
      throw new Error(errorMessage);
    }
    this.#winningNumber = winningNumber;
  }

  get getWinningNumber() {
    return this.#winningNumber;
  }

  setBonusNumber(bonusNumber, predicate, errorMessage) {
    if (predicate(bonusNumber) === false) {
      throw new Error(errorMessage);
    }
    this.#bonusNumber = bonusNumber;
  }

  get getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default Lotto;
