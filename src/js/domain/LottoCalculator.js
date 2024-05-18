import {
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../utils/LottoUtil';
import { ERROR_MESSAGE, LOTTO } from '../constants';

class LottoCalculator {
  #winningNumbers;
  #winningBonusNumber;
  #winningAmounts;
  #lottoLength;

  static DEFAULT_WINNING_AMOUNT = [
    2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000,
  ];
  static DUPLICATE_LOTTO_NUMBERS = '중복된 로또 번호 입니다.';

  constructor({
    winningNumbers,
    winningBonusNumber,
    winningAmounts = LottoCalculator.DEFAULT_WINNING_AMOUNT,
  }) {
    if (
      !isValidLottoNumberArray(winningNumbers, winningNumbers.length) ||
      !isValidLottoNumber(winningBonusNumber) ||
      !Array.isArray(winningAmounts)
    ) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (winningNumbers.includes(winningBonusNumber)) {
      throw new TypeError(LottoCalculator.DUPLICATE_LOTTO_NUMBERS);
    }
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
        return this.#winningAmounts[0];
      case this.#lottoLength - 1:
        return this.#hasBonusNumber(lottoNumbers, this.#winningBonusNumber)
          ? this.#winningAmounts[1]
          : this.#winningAmounts[2];
      case this.#lottoLength - 2:
        return this.#winningAmounts[3];
      case this.#lottoLength - 3:
        return this.#winningAmounts[4];
      default:
        return this.#winningAmounts[5];
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

  #getLottoResult(lottoNumbers) {
    return {
      matchCount: this.#getLottoNumberMatchCount(
        this.#winningNumbers,
        lottoNumbers
      ),
      winningRank: this.#calcWinningRank(lottoNumbers),
      winningAmount: this.#calcWinningAmount(lottoNumbers),
    };
  }

  getStatistics(lottoTickets) {
    const statistics = {
      chart: new Map([
        [
          LOTTO.RANK_5,
          {
            lottoTickets: [],
            winningAmount: this.#winningAmounts[4] ?? 0,
            matchCount: this.#lottoLength - 3,
          },
        ],
        [
          LOTTO.RANK_4,
          {
            lottoTickets: [],
            winningAmount: this.#winningAmounts[3] ?? 0,
            matchCount: this.#lottoLength - 2,
          },
        ],
        [
          LOTTO.RANK_3,
          {
            lottoTickets: [],
            winningAmount: this.#winningAmounts[2] ?? 0,
            matchCount: this.#lottoLength - 1,
          },
        ],
        [
          LOTTO.RANK_2,
          {
            lottoTickets: [],
            winningAmount: this.#winningAmounts[1] ?? 0,
            matchCount: this.#lottoLength - 1,
          },
        ],
        [
          LOTTO.RANK_1,
          {
            lottoTickets: [],
            winningAmount: this.#winningAmounts[0] ?? 0,
            matchCount: this.#lottoLength,
          },
        ],
      ]),
      profit: 0,
    };

    lottoTickets.forEach((lottoTicket) => {
      const lottoResult = this.#getLottoResult(lottoTicket.lottoNumbers);
      const winningRankRow = statistics.chart.get(lottoResult.winningRank);
      if (winningRankRow) {
        winningRankRow.lottoTickets.push(lottoTicket);
        statistics.profit = statistics.profit + lottoResult.winningAmount;
      }
    });

    return {
      profit: statistics.profit,
      chart: [...statistics.chart],
    };
  }
}

export default LottoCalculator;
