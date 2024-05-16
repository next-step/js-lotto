import { ERROR_MESSAGE, LOTTO } from '../constants';
import {
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../utils/LottoUtil';

class LottoCalculator {
  #winningNumbers;
  #winningBonusNumber;
  #winningAmounts;

  static DEFAULT_WINNING_AMOUNT = [
    2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0,
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
      case 6:
        return this.#winningAmounts[0];
      case 5:
        return this.#hasBonusNumber(lottoNumbers, this.#winningBonusNumber)
          ? this.#winningAmounts[1]
          : this.#winningAmounts[2];
      case 4:
        return this.#winningAmounts[3];
      case 3:
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
      case 6:
        return LOTTO.RANK_1;
      case 5:
        return this.#hasBonusNumber(lottoNumbers, this.#winningBonusNumber)
          ? LOTTO.RANK_2
          : LOTTO.RANK_3;
      case 4:
        return LOTTO.RANK_4;
      case 3:
        return LOTTO.RANK_5;
      default:
        return LOTTO.UNRANKED;
    }
  }

  getResult(lottoNumbers) {
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
    const chartMap = new Map([
      [
        LOTTO.RANK_5,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[4] ?? 0,
          matchCount: 3,
        },
      ],
      [
        LOTTO.RANK_4,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[3] ?? 0,
          matchCount: 4,
        },
      ],
      [
        LOTTO.RANK_3,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[2] ?? 0,
          matchCount: 5,
        },
      ],
      [
        LOTTO.RANK_2,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[1] ?? 0,
          matchCount: 5,
        },
      ],
      [
        LOTTO.RANK_1,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[0] ?? 0,
          matchCount: 6,
        },
      ],
    ]);
    let netReturn = 0;

    lottoTickets.forEach((lottoTicket) => {
      const lottoResult = this.getResult(lottoTicket.lottoNumbers);
      const winningRankRow = chartMap.get(lottoResult.winningRank);
      if (winningRankRow) {
        winningRankRow.lottoTickets.push(lottoTicket);
        netReturn = netReturn + lottoResult.winningAmount;
      }
    });

    return {
      netReturn,
      chart: [...chartMap],
    };
  }
}

export default LottoCalculator;
