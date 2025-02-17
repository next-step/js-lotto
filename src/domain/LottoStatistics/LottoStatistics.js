import {
  LOTTO_RANK_RULES,
  LOTTO_RANK_MONEY,
  TICKET_PRICE,
  LOTTO_RANK,
  LOTTO_RANK_KEY_REVERSE,
  PRISE_LOOKUP_TABLE,
  RANK_MAPPING_LOOKUP_TABLE,
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
    const rankMapping = RANK_MAPPING_LOOKUP_TABLE[count];

    if (rankMapping === undefined) {
      return 0;
    }

    if (typeof rankMapping === "object") {
      return rankMapping[isBonus];
    }
    return rankMapping;
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
      this.#result[LOTTO_RANK_KEY_REVERSE[rank]] += 1;
    });
    return this.#result;
  }

  static calculateLottoPrize(rank) {
    if (!(rank in PRISE_LOOKUP_TABLE)) {
      throw new Error(LOTTO_STATISTICS_ERROR_MESSAGE.INVALID_LOTTO_LANK);
    }

    return PRISE_LOOKUP_TABLE[rank];
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
