import { ERROR_MESSAGE, LOTTO } from '../constants';
import {
  isValidLottoNumber,
  isValidLottoNumberArray,
} from '../utils/LottoUtil';
import LottoTicket from './LottoTicket';

class LottoCalculator {
  #winningNumbers;
  #bonusWinningNumber;
  #winningAmounts;

  static DEFAULT_WINNING_AMOUNT = [
    2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0,
  ];
  static DUPLICATE_LOTTO_NUMBERS = '중복된 로또 번호 입니다.';

  constructor({
    winningNumbers,
    bonusWinningNumber,
    winningAmounts = LottoCalculator.DEFAULT_WINNING_AMOUNT,
  }) {
    if (
      !isValidLottoNumberArray(winningNumbers) ||
      !isValidLottoNumber(bonusWinningNumber) ||
      !Array.isArray(winningAmounts)
    ) {
      throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
    }
    if (winningNumbers.includes(bonusWinningNumber)) {
      throw new TypeError(LottoCalculator.DUPLICATE_LOTTO_NUMBERS);
    }
    if (winningAmounts.length !== LOTTO.WINNING_NUMBER_LENGTH) {
      throw new TypeError(ERROR_MESSAGE.INVALID_LOTTO_FORMAT);
    }
    this.#winningNumbers = winningNumbers;
    this.#bonusWinningNumber = bonusWinningNumber;
    this.#winningAmounts = winningAmounts;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get bonusWinningNumber() {
    return this.#bonusWinningNumber;
  }

  getStatistics(lottoTickets) {
    const chartMap = new Map([
      [
        LOTTO.RANK_5,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[4],
          matchCount: 3,
        },
      ],
      [
        LOTTO.RANK_4,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[3],
          matchCount: 4,
        },
      ],
      [
        LOTTO.RANK_3,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[2],
          matchCount: 5,
        },
      ],
      [
        LOTTO.RANK_2,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[1],
          matchCount: 5,
        },
      ],
      [
        LOTTO.RANK_1,
        {
          lottoTickets: [],
          winningAmount: this.#winningAmounts[0],
          matchCount: 6,
        },
      ],
    ]);
    let netReturn = 0;

    lottoTickets.forEach((lottoTicket) => {
      const lottoResult = lottoTicket.getResult({
        winningNumbers: this.#winningNumbers,
        bonusWinningNumber: this.#bonusWinningNumber,
        winningAmounts: this.#winningAmounts,
      });

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
