import {
  LOTTO_RANK_RULES,
  LOTTO_RANK_MONEY,
  TICKET_PRICE,
  LOTTO_RANK,
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

    if (count === LOTTO_RANK_RULES.FIRST) return LOTTO_RANK.FIRST;
    if (count === LOTTO_RANK_RULES.SECOND && isBonus) return LOTTO_RANK.SECOND;
    if (count === LOTTO_RANK_RULES.THIRD && !isBonus) return LOTTO_RANK.THIRD;
    if (count === LOTTO_RANK_RULES.FOURTH) return LOTTO_RANK.FOURTH;
    if (count === LOTTO_RANK_RULES.FIFTH) return LOTTO_RANK.FIFTH;
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
      case LOTTO_RANK.FIRST:
        return LOTTO_RANK_MONEY.FIRST;
      case LOTTO_RANK.SECOND:
        return LOTTO_RANK_MONEY.SECOND;
      case LOTTO_RANK.THIRD:
        return LOTTO_RANK_MONEY.THIRD;
      case LOTTO_RANK.FOURTH:
        return LOTTO_RANK_MONEY.FOURTH;
      case LOTTO_RANK.FIFTH:
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
