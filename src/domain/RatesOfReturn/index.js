import RATES_OF_RETURN_RULE from "./rule.js";
import { WINNING_PRICE_RULE } from "../WinningDetail/rule.js";
import RATES_OF_RETURN_ERRORS from "./error.js";

class RatesOfReturn {
  #value;

  constructor({ purchasePrice, winningDetail }) {
    this.#setValue({
      purchasePrice,
      winningDetail,
      errorMessage: RATES_OF_RETURN_ERRORS.NOT_CALCULATED_MESSAGE,
    });
  }

  #setValue({ purchasePrice, winningDetail, errorMessage }) {
    if (RATES_OF_RETURN_RULE.purchasePriceRule(purchasePrice) === false) {
      throw new Error(errorMessage);
    }
    if (RATES_OF_RETURN_RULE.winningDetailRule(winningDetail) === false) {
      throw new Error(errorMessage);
    }

    const sumWinningAmount = Object.entries(winningDetail.getWinner).reduce(
      (acr, cur) => {
        const [key, value] = cur;
        // eslint-disable-next-line no-param-reassign
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
