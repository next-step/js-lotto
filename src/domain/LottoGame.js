import { LottoRank } from "./LottoRank.js";

export class LottoGame {
  static LOTTO_PRICE = 1_000;
  static LOTTO_RANK = {
    FIRST: LottoRank.of("first", 2_000_000_000, 6),
    SECOND: LottoRank.of("second", 30_000_000, 5),
    THIRD: LottoRank.of("third", 1_500_000, 5),
    FOURTH: LottoRank.of("fourth", 50_000, 4),
    FIFTH: LottoRank.of("fifth", 5_000, 3),
  };

  static validateLottoPurchasePrice(purchasePrice) {
    if (purchasePrice % LottoGame.LOTTO_PRICE !== 0) {
      throw new Error(
        `로또 구입 금액은 ${commarize(
          LottoGame.LOTTO_PRICE
        )}원 단위로 입력해주세요.`
      );
    }

    if (typeof purchasePrice !== "number" || Number.isNaN(purchasePrice)) {
      throw new Error("로또 구입 금액은 숫자값을 입력해주세요.");
    }
  }

  checkResult({ lottos, winningLotto }) {
    const result = {
      [LottoGame.LOTTO_RANK.FIRST.value.rankName]: 0,
      [LottoGame.LOTTO_RANK.SECOND.value.rankName]: 0,
      [LottoGame.LOTTO_RANK.THIRD.value.rankName]: 0,
      [LottoGame.LOTTO_RANK.FOURTH.value.rankName]: 0,
      [LottoGame.LOTTO_RANK.FIFTH.value.rankName]: 0,
    };

    for (let i = 0; i < lottos.length; i += 1) {
      const lotto = lottos[i];

      const matchCount = lotto.compare(winningLotto.value.lotto);

      if (matchCount < LottoGame.LOTTO_RANK.FIFTH.value.matchCount) {
        continue;
      }

      const rank = this.#getRankByMatchCount({
        lottoNumber: lotto.value,
        bonusNumber: winningLotto.value.bonusNumber,
        matchCount,
      });

      result[rank] += 1;
    }

    return result;
  }

  #getRankByMatchCount({ lottoNumber, bonusNumber, matchCount }) {
    if (matchCount === LottoGame.LOTTO_RANK.SECOND.value.COUNT) {
      return lottoNumber.includes(bonusNumber)
        ? LottoGame.LOTTO_RANK.SECOND.value.NAME
        : LottoGame.LOTTO_RANK.THIRD.value.NAME;
    }

    const lottoRank = Object.values(LottoGame.LOTTO_RANK).find(
      (lottoRank) => lottoRank.value.matchCount === matchCount
    );
    return lottoRank.value.rankName;
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
      result += LottoGame.LOTTO_RANK[rank.toUpperCase()].value.prize * count;
    });

    return result;
  }
}
