import { WINNING_PRICE_RULE, RATES_OF_RETURN_RULE } from "../util/rule.js";

class RatesOfReturn {
  #value;

  constructor({ purchasePrice, winningDetail }) {
    this.#setValue(purchasePrice, winningDetail, "수익률을 계산할 수 없어요.");
  }

  #setValue(purchasePrice, winningDetail, errorMessage) {
    if (RATES_OF_RETURN_RULE.purchasePriceRule(purchasePrice) === false) {
      throw new Error(errorMessage);
    }
    if (RATES_OF_RETURN_RULE.winningDetailRule(winningDetail) === false) {
      throw new Error(errorMessage);
    }

    const sumWinningAmount = Object.entries(winningDetail.getWinner).reduce(
      (acr, cur) => {
        const [key, value] = cur;
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
