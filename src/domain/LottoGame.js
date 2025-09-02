import { Lotto } from "./Lotto.js";

export class LottoGame {
  static LOTTO_PRICE = 1_000;
  static LOTTO_RANK = {
    FIRST: {
      NAME: "first",
      PRIZE: 2_000_000_000,
      COUNT: 6,
    },
    SECOND: {
      NAME: "second",
      PRIZE: 30_000_000,
      COUNT: 5,
    },
    THIRD: {
      NAME: "third",
      PRIZE: 1_500_000,
      COUNT: 5,
    },
    FOURTH: {
      NAME: "fourth",
      PRIZE: 50_000,
      COUNT: 4,
    },
    FIFTH: {
      NAME: "fifth",
      PRIZE: 5_000,
      COUNT: 3,
    },
  };

  buy(price) {
    const lottoCountToBuy = price / LottoGame.LOTTO_PRICE;

    return Array.from({ length: lottoCountToBuy }, () => Lotto.issue());
  }

  checkResult({ lottoNumbers, winningNumber, bonusNumber }) {
    const result = {
      [LottoGame.LOTTO_RANK.FIRST.NAME]: 0,
      [LottoGame.LOTTO_RANK.SECOND.NAME]: 0,
      [LottoGame.LOTTO_RANK.THIRD.NAME]: 0,
      [LottoGame.LOTTO_RANK.FOURTH.NAME]: 0,
      [LottoGame.LOTTO_RANK.FIFTH.NAME]: 0,
    };

    for (let i = 0; i < lottoNumbers.length; i += 1) {
      const lottoNumber = lottoNumbers[i];
      let matchCount = 0;

      for (let j = 0; j < lottoNumber.length; j += 1) {
        const number = lottoNumber[j];

        if (winningNumber.includes(number)) {
          matchCount += 1;
        }
      }

      if (matchCount < LottoGame.LOTTO_RANK.FIFTH.COUNT) {
        continue;
      }

      const rank = this.#getRankByMatchCount({
        lottoNumber,
        matchCount,
        bonusNumber,
      });

      result[rank] += 1;
    }

    return result;
  }

  #getRankByMatchCount({ lottoNumber, bonusNumber, matchCount }) {
    if (matchCount === LottoGame.LOTTO_RANK.FIFTH.COUNT) {
      return LottoGame.LOTTO_RANK.FIFTH.NAME;
    }

    if (matchCount === LottoGame.LOTTO_RANK.FOURTH.COUNT) {
      return LottoGame.LOTTO_RANK.FOURTH.NAME;
    }

    if (matchCount === LottoGame.LOTTO_RANK.SECOND.COUNT) {
      if (lottoNumber.includes(bonusNumber)) {
        return LottoGame.LOTTO_RANK.SECOND.NAME;
      }
      return LottoGame.LOTTO_RANK.THIRD.NAME;
    }

    if (matchCount === LottoGame.LOTTO_RANK.FIRST.COUNT) {
      return LottoGame.LOTTO_RANK.FIRST.NAME;
    }
  }

  /**
   * 0%는 0, 100%는 1로 반환하고 있어서 사용하는 곳에서 필요에 따라 포맷팅이 필요합니다.
   */
  getRateOfReturn({ purchasePrice, lottoResult }) {
    const totalPrice = this.#getLottoResultTotalPrice(lottoResult);

    return totalPrice / purchasePrice;
  }

  #getLottoResultTotalPrice(lottoResult) {
    let result = 0;

    Object.entries(lottoResult).forEach(([rank, count]) => {
      result += LottoGame.LOTTO_RANK[rank.toUpperCase()].PRIZE * count;
    });

    return result;
  }
}
