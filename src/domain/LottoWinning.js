class LottoWinning {
  static LOTTO_RANKS_CONDITION = {
    FIRST: {
      rank: "FIRST",
      prize: 2000000000,
      matchCount: 6,
      isMatchBonusNumber: false,
    },
    SECOND: {
      rank: "SECOND",
      prize: 30000000,
      matchCount: 5,
      isMatchBonusNumber: true,
    },
    THIRD: {
      rank: "THIRD",
      prize: 1500000,
      matchCount: 5,
      isMatchBonusNumber: false,
    },
    FOURTH: {
      rank: "FOURTH",
      prize: 50000,
      matchCount: 4,
      isMatchBonusNumber: false,
    },
    FIFTH: {
      rank: "FIFTH",
      prize: 5000,
      matchCount: 3,
      isMatchBonusNumber: false,
    },
  };

  #rank = "";
  #prize = 0;

  constructor(lottoNumbers, lottoResultNumbers, lottoBonusNumber) {
    this.winningResult(lottoNumbers, lottoResultNumbers, lottoBonusNumber);
  }

  get prize() {
    return this.#prize;
  }
  get rank() {
    return this.#rank;
  }

  matchResultNumbers(lottoNumbers, lottoResultNumbers) {
    return lottoNumbers.filter((number) => lottoResultNumbers.includes(number));
  }

  isMatchedBonusNumber(lottoNumbers, lottoBonusNumber) {
    return lottoNumbers.includes(lottoBonusNumber);
  }

  winningResult(lottoNumbers, lottoResultNumbers, lottoBonusNumber) {
    const matchedNumber = this.matchResultNumbers(
      lottoNumbers,
      lottoResultNumbers
    );

    switch (matchedNumber.length) {
      case LottoWinning.LOTTO_RANKS_CONDITION.FIRST.matchCount:
        this.#prize = LottoWinning.LOTTO_RANKS_CONDITION.FIRST.prize;
        this.#rank = LottoWinning.LOTTO_RANKS_CONDITION.FIRST.rank;
        break;
      case LottoWinning.LOTTO_RANKS_CONDITION.SECOND.matchCount:
        if (this.isMatchedBonusNumber(lottoNumbers, lottoBonusNumber)) {
          this.#prize = LottoWinning.LOTTO_RANKS_CONDITION.SECOND.prize;
          this.#rank = LottoWinning.LOTTO_RANKS_CONDITION.SECOND.rank;
          return;
        }
        this.#prize = LottoWinning.LOTTO_RANKS_CONDITION.THIRD.prize;
        this.#rank = LottoWinning.LOTTO_RANKS_CONDITION.THIRD.rank;
        break;
      case LottoWinning.LOTTO_RANKS_CONDITION.FOURTH.matchCount:
        this.#prize = LottoWinning.LOTTO_RANKS_CONDITION.FOURTH.prize;
        this.#rank = LottoWinning.LOTTO_RANKS_CONDITION.FOURTH.rank;
        break;
      case LottoWinning.LOTTO_RANKS_CONDITION.FIFTH.matchCount:
        this.#prize = LottoWinning.LOTTO_RANKS_CONDITION.FIFTH.prize;
        this.#rank = LottoWinning.LOTTO_RANKS_CONDITION.FIFTH.rank;
        break;
      default:
        break;
    }
  }
}

export default LottoWinning;
