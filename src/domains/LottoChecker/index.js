export const RANKS = [1, 2, 3, 4, 5];

export class LottoChecker {
  static RANK_INFO = {
    1: {
      price: 2_000_000_000,
      matchingCount: 6,
    },
    2: {
      price: 30_000_000,
      matchingCount: 5,
    },
    3: {
      price: 1_500_000,
      matchingCount: 5,
    },
    4: {
      price: 50_000,
      matchingCount: 4,
    },
    5: {
      price: 5_000,
      matchingCount: 3,
    },
  };

  static checkLotto(winningLotto, lottos) {
    const rankResult = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    for (const lotto of lottos) {
      const matchingResult = winningLotto.evaluateLotto(lotto);
      switch (matchingResult.matchingCount) {
        case 3:
          rankResult[5] += 1;
          break;
        case 4:
          rankResult[4] += 1;
          break;
        case 5:
          if (matchingResult.isBonusNumberMatched) {
            rankResult[2] += 1;
          } else {
            rankResult[3] += 1;
          }
          break;
        case 6:
          rankResult[1] += 1;
          break;
        default:
          break;
      }
    }

    const totalPrice = RANKS.reduce((totalAmount, rank) => {
      return (
        totalAmount + LottoChecker.RANK_INFO[rank].price * rankResult[rank]
      );
    }, 0);

    return { rankResult, totalPrice };
  }
}
