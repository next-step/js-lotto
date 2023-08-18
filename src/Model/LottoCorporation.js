import { PRODUCTS_NAME, LOTTO_PRIZE_BOARD, NUMBER } from '../constants';

/**
 * 로또의 판매 및 Ticket 결과를 확인하는 객체입니다.
 */
export class LottoCorporation {
  #lottoStore;

  constructor(lottoStore) {
    this.#lottoStore = lottoStore;
  }

  buyTickets(purchaseAmount) {
    const tickets = this.#lottoStore.buyProduct(
      PRODUCTS_NAME.LOTTO_TICKET,
      purchaseAmount
    );

    return tickets;
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
