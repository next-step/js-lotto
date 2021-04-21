import { lottoPrices } from '../utils/lottoPrices.js';
import { LOTTO_NUMBERS } from '../utils/constants.js';

export default class LottoRankController {
  setRanks(lottos, winningNumbers) {
    const matchingCounts = this.getMatchingNums(lottos, winningNumbers);
    const isMatchBonusArr = this.getMatchingBonus(lottos, winningNumbers);

    return this.initRanks(matchingCounts, isMatchBonusArr);
  }

  getMatchingNums(lottos, winningNumbers) {
    return lottos.map(lotto =>
      this.checkMatchingCount(
        lotto,
        winningNumbers.slice(0, LOTTO_NUMBERS.LOTTO_COUNT)
      )
    );
  }

  checkMatchingCount(lotto, winningNumbers) {
    return winningNumbers.reduce((matchingCount, winningNumber) => {
      if (lotto.numbers.has(winningNumber)) {
        matchingCount++;
      }
      return matchingCount;
    }, 0);
  }

  getMatchingBonus(lottos, winningNumbers) {
    return lottos.map(lotto =>
      lotto.numbers.has(winningNumbers[LOTTO_NUMBERS.WINNING_NUMBER_COUNT - 1])
    );
  }

  initRanks(matchingCounts, isMatchBonusArr) {
    const ranks = [];
    for (let i = 0; i < matchingCounts.length; i++) {
      const lottoPrice = this.findLottoRank(
        matchingCounts[i],
        isMatchBonusArr[i]
      );
      ranks.push(lottoPrice ? lottoPrice.rank : 0);
    }

    return ranks;
  }

  findLottoRank(matchingCount, isMatchBonus) {
    return lottoPrices.find(
      lottoPrice =>
        lottoPrice.matchNumberCount === matchingCount &&
        lottoPrice.matchBonus === isMatchBonus
    );
  }
}
