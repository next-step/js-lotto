import { LOTTO_PRICE, LOTTO_PRIZE, LOTTO_MATCH_COUNT } from '../constants/index.js';

class LottoOrganizer {
  #lottoCalculator = null;

  constructor(lottoCalculator) {
    this.#lottoCalculator = lottoCalculator;
  }

  static lottoPrice() {
    return LOTTO_PRICE;
  }

  #getWinningDetails(matchLottoNumberCount, matchBonusNumberCount) {
    const matcherArray = Array.from(Object.entries(LOTTO_MATCH_COUNT));

    const rank = matcherArray.find(([, value]) => {
      const { BASE_NUMBER, BONUS_NUMBER } = value;
      return matchLottoNumberCount === BASE_NUMBER && matchBonusNumberCount === BONUS_NUMBER;
    });

    return (rank && rank.at(0)) ?? 'OTHERS';
  }

  getWinningReturnRate(lottoTickets) {
    const totalCost = LottoOrganizer.lottoPrice() * lottoTickets.length;
    const totalPrize = lottoTickets.reduce((acc, lottoTicket) => {
      const { prize } = lottoTicket.result;
      return acc + prize;
    }, 0);

    return this.#lottoCalculator.calculateWinningReturnRate(totalCost, totalPrize);
  }

  matchToLottoTickets(lottoTickets) {
    lottoTickets.forEach((lottoTicket) => {
      const { matchLottoNumberCount, matchBonusNumberCount } = this.#lottoCalculator.calculateLottoMatchCounts(
        lottoTicket.lottoNumber
      );
      const rank = this.#getWinningDetails(matchLottoNumberCount, matchBonusNumberCount);
      const prize = LOTTO_PRIZE[rank];
      lottoTicket.setResult({
        rank,
        prize
      });
    });
  }
}

export default LottoOrganizer;
