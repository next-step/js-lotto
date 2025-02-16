const LOTTO_RANK_RULES = {
  FIRST: 6,
  SECOND: 5,
  THIRD: 5,
  FOURTH: 4,
  FIFTH: 3,
};

class LottoStatistics {
  constructor(result) {
    this.result = result;
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

  calculateProfit() {
    console.log(this.result);
    const lottoRank = this.result.map((x) =>
      this.getLottoRank(x.matchedNumbers, x.hasBonus)
    );
    console.log(lottoRank);

    // 계산 되어야 함

    lottoRank.reduce((acc, cur) => {
      if (cur === 1) {
        return [...acc, {}];
      }
    }, []);

    // return (
    //   {
    //     1: LOTTO_JACKPOT_PRICES.FIRST,
    //     2: LOTTO_JACKPOT_PRICES.SECOND,
    //     3: LOTTO_JACKPOT_PRICES.THIRD,
    //     4: LOTTO_JACKPOT_PRICES.FOURTH,
    //     5: LOTTO_JACKPOT_PRICES.FIFTH,
    //   }[rank] ?? 0
    // );

    return [
      {
        matched: 3,
        count: 0,
        price: 5000,
      },
      {
        matched: 4,
        count: 1,
        price: 50000,
      },
      {
        matched: 5,
        count: 0,
        price: 1500000,
      },
      {
        matched: 5,
        count: 1,
        price: 30000000,
        bonus: true,
      },
      {
        matched: 6,
        count: 1,
        price: 2000000000,
      },
    ];
  }
}

// 당첨 통계
// --------------------
// 3개 일치 (5,000원) - 1개
// 4개 일치 (50,000원) - 0개
// 5개 일치 (1,500,000원) - 0개
// 5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
// 6개 일치 (2,000,000,000원) - 0개
// 총 수익률은 62.5%입니다.

export default LottoStatistics;
