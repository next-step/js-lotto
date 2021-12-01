import { computedAmount, get2DLottoNumberList, getTotalReturnRate } from "../utils/common.js";
import { WINNINGS } from "../constants/index.js"

class Model {
  tag = "Model";
  #purchaseAmount;
  #lottoTickets;
  #winningNumbers;

  constructor() {
    this.init();
  }

  init() {
    this.#purchaseAmount = "";
    this.#lottoTickets = [];
    this.#winningNumbers = new Array(7).fill(0);
  }

  set purchaseAmount(price) {
    this.#purchaseAmount = computedAmount(price);
  }

  get purchaseAmount() {
    return this.#purchaseAmount;
  }

  setlottoTicketsAuto(amount) {
    this.#lottoTickets = get2DLottoNumberList(amount);
  }

  setlottoTicketsManual(manualLottoList) {
    const restAmount = this.#purchaseAmount - manualLottoList.length;

    if (restAmount > 0) {
      this.#lottoTickets = [...manualLottoList, ...get2DLottoNumberList(restAmount)];
    } else {
      this.#lottoTickets = manualLottoList;
    }
  }

  get lottoTickets() {
    return this.#lottoTickets;
  }

  set winningNumbers(winningNumbers) {
    this.#winningNumbers = winningNumbers;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  getLottoResults() {
    const bonus = this.#winningNumbers[this.#winningNumbers.length - 1];
    const winningNumberWithoutBonus = this.#winningNumbers.slice(0, -1);

    const lottoResultObj = this.#lottoTickets.reduce((prevObj, lottoTicket) => {
      const matchedCount = this.getMatchedCount(lottoTicket, winningNumberWithoutBonus);

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
      totlaReturnRate: getTotalReturnRate(totalWinning, this.#purchaseAmount)
    }
  }

  getMatchedCount(lottTicket, winningNumbers) {
    const winningNumberSet = new Set(winningNumbers);

    lottTicket.forEach((num) => {
      if (winningNumberSet.has(num)) winningNumberSet.delete(num);
    });

    return winningNumbers.length - winningNumberSet.size;
  }

}

export default new Model();
