import { LOTTO } from '../constants';
import LottoThrowMessage from '../utils/LottoThrowMessage';

class LottoCalculator {
  #winningNumbers;
  #winningBonusNumber;
  #winningAmounts;
  #lottoLength;

  static DEFAULT_WINNING_AMOUNT = {
    first: 2_000_000_000,
    second: 30_000_000,
    third: 1_500_000,
    fourth: 50_000,
    fifth: 5_000,
  };

  constructor({
    winningNumbers,
    winningBonusNumber,
    winningAmounts = LottoCalculator.DEFAULT_WINNING_AMOUNT,
  }) {
    new LottoThrowMessage(winningNumbers).isLottoNumberArray();
    new LottoThrowMessage(winningBonusNumber)
      .isLottoNumber()
      .checkDuplicateLottoNumbers(winningNumbers);

    this.#winningNumbers = winningNumbers;
    this.#winningBonusNumber = winningBonusNumber;
    this.#winningAmounts = winningAmounts;
    this.#lottoLength = winningNumbers.length;
  }

  #getLottoNumberMatchCount(winningNumbers, lottoNumbers) {
    return winningNumbers.reduce(
      (count, winningNumber) =>
        lottoNumbers.includes(winningNumber) ? count + 1 : count,
      0
    );
  }

  #hasBonusNumber(lottoNumbers, bonusNumber) {
    return lottoNumbers.includes(bonusNumber);
  }

  #calcWinningAmount(lottoNumbers) {
    const matchCount = this.#getLottoNumberMatchCount(
      this.#winningNumbers,
      lottoNumbers
    );
    switch (matchCount) {
      case this.#lottoLength:
        return this.#winningAmounts.first;
      case this.#lottoLength - 1:
        return this.#hasBonusNumber(lottoNumbers, this.#winningBonusNumber)
          ? this.#winningAmounts.second
          : this.#winningAmounts.third;
      case this.#lottoLength - 2:
        return this.#winningAmounts.fourth;
      case this.#lottoLength - 3:
        return this.#winningAmounts.fifth;
      default:
        return 0;
    }
  }

  #calcWinningRank(lottoNumbers) {
    const matchCount = this.#getLottoNumberMatchCount(
      this.#winningNumbers,
      lottoNumbers
    );
    switch (matchCount) {
      case this.#lottoLength:
        return LOTTO.RANK_1;
      case this.#lottoLength - 1:
        return this.#hasBonusNumber(lottoNumbers, this.#winningBonusNumber)
          ? LOTTO.RANK_2
          : LOTTO.RANK_3;
      case this.#lottoLength - 2:
        return LOTTO.RANK_4;
      case this.#lottoLength - 3:
        return LOTTO.RANK_5;
      default:
        return LOTTO.UNRANKED;
    }
  }

  getProfit(lottoTickets) {
    return lottoTickets.reduce((acc, lottoTicket) => {
      return acc + this.#calcWinningAmount(lottoTicket.lottoNumbers);
    }, 0);
  }

  getChart(lottoTickets) {
    const statistics = [
      {
        rank: LOTTO.RANK_5,
        lottoTickets: [],
        winningAmount: this.#winningAmounts.fifth,
        matchCount: this.#lottoLength - 3,
      },
      {
        rank: LOTTO.RANK_4,
        lottoTickets: [],
        winningAmount: this.#winningAmounts.fourth,
        matchCount: this.#lottoLength - 2,
      },
      {
        rank: LOTTO.RANK_3,
        lottoTickets: [],
        winningAmount: this.#winningAmounts.third,
        matchCount: this.#lottoLength - 1,
      },
      {
        rank: LOTTO.RANK_2,
        lottoTickets: [],
        winningAmount: this.#winningAmounts.second,
        matchCount: this.#lottoLength - 1,
      },
      {
        rank: LOTTO.RANK_1,
        lottoTickets: [],
        winningAmount: this.#winningAmounts.first,
        matchCount: this.#lottoLength,
      },
    ];

    lottoTickets.forEach((lottoTicket) => {
      const rank = this.#calcWinningRank(lottoTicket.lottoNumbers);
      const rankedLotto = statistics.find((row) => row.rank === rank);
      if (rankedLotto) {
        rankedLotto.lottoTickets.push(lottoTicket);
      }
    });

    return statistics;
  }

  getStatistics(lottoTickets) {
    return {
      chart: this.getChart(lottoTickets),
      profit: this.getProfit(lottoTickets),
    };
  }
}

export default LottoCalculator;
