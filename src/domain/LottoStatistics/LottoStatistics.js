import {
  LOTTO_RANK_RULES,
  LOTTO_RANK_MONEY,
  TICKET_PRICE,
} from "./constant.js";
import LOTTO_ERROR_MESSAGE from "../Lotto/lottoErrorMessage.js";
import LOTTO_STATISTICS_ERROR_MESSAGE from "./lottoStatisticsErrorMessage.js";

class LottoStatistics {
  #money;
  #lottoRankList = [];
  #result = {
    FIRST: 0,
    SECOND: 0,
    THIRD: 0,
    FOURTH: 0,
    FIFTH: 0,
  };
  constructor(money) {
    LottoStatistics.validateLottoStatistics(money);
    this.#money = money;
  }

  getLottoRank(matchedNumbers, isBonus) {
    const count = matchedNumbers.length;

    if (count === LOTTO_RANK_RULES.FIRST) return 1;
    if (count === LOTTO_RANK_RULES.SECOND && isBonus) return 2;
    if (count === LOTTO_RANK_RULES.THIRD && !isBonus) return 3;
    if (count === LOTTO_RANK_RULES.FOURTH) return 4;
    if (count === LOTTO_RANK_RULES.FIFTH) return 5;
    return 0;
  }

  get lottoRankList() {
    return this.#lottoRankList;
  }

  get money() {
    return this.#money;
  }

  get result() {
    return this.#result;
  }

  setLottoRank(number) {
    this.#lottoRankList.push(number);
  }

  setLottoResult() {
    this.#lottoRankList.forEach((rank) => {
      switch (rank) {
        case 1:
          this.#result.FIRST += 1;
          break;
        case 2:
          this.#result.SECOND += 1;
          break;
        case 3:
          this.#result.THIRD += 1;
          break;
        case 4:
          this.#result.FOURTH += 1;
          break;
        case 5:
          this.#result.FIFTH += 1;
          break;
        default:
          break;
      }
    });
    return this.#result;
  }

  static calculateLottoPrize(rank) {
    switch (rank) {
      case 1:
        return LOTTO_RANK_MONEY.FIRST;
      case 2:
        return LOTTO_RANK_MONEY.SECOND;
      case 3:
        return LOTTO_RANK_MONEY.THIRD;
      case 4:
        return LOTTO_RANK_MONEY.FOURTH;
      case 5:
        return LOTTO_RANK_MONEY.FIFTH;
      default:
        throw new Error(LOTTO_STATISTICS_ERROR_MESSAGE.INVALID_LOTTO_LANK);
    }
  }

  static totalWinning(winningCounts) {
    return (
      (winningCounts.FIRST || 0) * LOTTO_RANK_MONEY.FIRST +
      (winningCounts.SECOND || 0) * LOTTO_RANK_MONEY.SECOND +
      (winningCounts.THIRD || 0) * LOTTO_RANK_MONEY.THIRD +
      (winningCounts.FOURTH || 0) * LOTTO_RANK_MONEY.FOURTH +
      (winningCounts.FIFTH || 0) * LOTTO_RANK_MONEY.FIFTH
    );
  }

  calculateROI = (totalReturn) => {
    if (this.money === 0) {
      throw new Error("Investment cannot be zero");
    }

    const roi = (totalReturn / this.money) * 100;

    return roi;
  };

  static validateLottoStatistics(money) {
    if (money < TICKET_PRICE) {
      throw new Error(LOTTO_ERROR_MESSAGE.MIN_ORDER_AMOUNT);
    }
    if (money % TICKET_PRICE !== 0) {
      throw new Error(LOTTO_ERROR_MESSAGE.INVALID_ORDER_AMOUNT_UNIT);
    }
  }
}

export default LottoStatistics;
