import { computedAmount, getLottoNumberList } from "../utils/common.js";
import { LOTTO_PRICE, WINNINGS } from "../constants/index.js"

class Model {
  tag = "Model";
  #purchaseAmount;
  #lottoTickets;
  #winnings;

  constructor() {
    this.init();
  }

  init() {
    this.#purchaseAmount = "";
    this.#lottoTickets = [];
    this.#winnings = new Array(7).fill(0);
  }

  set purchaseAmount(purchaseAmount) {
    this.#purchaseAmount = computedAmount(purchaseAmount);
    this.lottoTickets = this.#purchaseAmount;
  }

  get purchaseAmount() {
    return this.#purchaseAmount;
  }

  set lottoTickets(amount) {
    this.#lottoTickets = new Array(amount).fill(0).map(v => getLottoNumberList());
  }

  get lottoTickets() {
    return this.#lottoTickets;
  }

  set winnings(winnings) {
    this.#winnings = winnings;
    console.log(`[${this.tag}] tshis.#winnings -> ${this.#winnings}`);
  }

  get winnings() {
    return this.#winnings;
  }

  getLottoResults() {
    const bonus = this.#winnings.slice(-1).pop();
    const winningsWithoutBonus = this.#winnings.slice(0, -1);

    const lottoResultObj = this.#lottoTickets.reduce((prevObj, lottoTicket) => {
      const matchedCount = this.getMatchedCount(lottoTicket, winningsWithoutBonus);

      if (matchedCount >= 3) {
        prevObj[`NUM${matchedCount}${matchedCount === 5 && lottoTicket.some((num) => num === bonus)
          ? "_BONUS"
          : ""
          }`] += 1;
      }
      return prevObj;

    }, Object.fromEntries(Object.keys(WINNINGS).map(key => [key, 0])));

    const totalWinning = Object.entries(WINNINGS).reduce((total, [key, { price }]) => {
      if (lottoResultObj[key]) {
        total += lottoResultObj[key] * price;
      }
      return total;
    }, 0);

    return {
      lottoResultObj,
      totlaReturnRate: ((totalWinning / (this.#purchaseAmount * LOTTO_PRICE)) * 100) - 100
    }
  }

  getMatchedCount(lottTicket, winnings) {
    const winningSet = new Set(winnings);

    lottTicket.forEach((num) => {
      if (winningSet.has(num)) winningSet.delete(num);
    });

    return winnings.length - winningSet.size;
  }

}

export default new Model();
