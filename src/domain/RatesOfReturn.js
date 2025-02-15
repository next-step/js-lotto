import { WINNING_PRICE_RULE } from "../util/rule.js";

class RatesOfReturn {
  #value;

  constructor({ purchasePrice, winningDetail }) {
    this.#setValue(purchasePrice, winningDetail);
  }

  #setValue(purchasePrice, winningDetail, winningAmountPolicy) {
    const sumWinningAmount = Object.entries(winningDetail).reduce(
      (acr, [key, value]) => {
        acr += WINNING_PRICE_RULE[key] * value;
        return acr;
      },
      0,
    );
    const perCentValue = (sumWinningAmount / purchasePrice) * 100;
    this.#value = `${perCentValue}%`;
  }

  get getValue() {
    return this.#value;
  }
}

export default RatesOfReturn;
