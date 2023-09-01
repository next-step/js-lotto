import { LOTTO_PRIZE_BOARD, NUMBER } from '../constants';
import { LottoStore } from '../Model';

/**
 * 로또의 판매 및 Ticket 결과를 확인하는 객체입니다.
 */
export class LottoCorporation {
  #lottoStore;

  constructor() {
    this.#lottoStore = new LottoStore();
  }

  buyTickets(purchaseAmount) {
    return this.#lottoStore.buyTickets(purchaseAmount);
  }

  checkTicketResult(ticketNumbers, winningNumbers) {
    const { lottoNumbers, bonusNumber } = winningNumbers;

    const matchingCount = ticketNumbers.filter((number) =>
      lottoNumbers.includes(number)
    ).length;
    const isBonusMatched = ticketNumbers.includes(bonusNumber);

    const prize = this.#calculateWinningPrize(matchingCount, isBonusMatched);

    return { matchingCount, prize };
  }

  #calculateWinningPrize(matchingCount, isBonusMatched) {
    if (matchingCount === NUMBER.LOTTO_PRIZE.BONUS_MATCH_THRESHOLD) {
      if (isBonusMatched) return LOTTO_PRIZE_BOARD[matchingCount].withBonus;

      return LOTTO_PRIZE_BOARD[matchingCount].withoutBonus;
    }

    return LOTTO_PRIZE_BOARD[matchingCount] || NUMBER.LOTTO_PRIZE.DEFAULT;
  }
}
