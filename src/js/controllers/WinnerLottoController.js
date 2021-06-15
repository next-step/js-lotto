import { LOTTO_INDEX, PRICE } from '../utils/constants.js';

export default class WinnerLottoController {
  setLottos({ winningNumbers, lottos }) {
    this.bonusNumber = Number(winningNumbers.get(LOTTO_INDEX.BONUS));
    this.winningNumbers = LOTTO_INDEX.NUMBERS.map((index) => winningNumbers.get(index));
    this.lottos = lottos;
    return this.findRank();
  }

  findRank() {
    const rankCount = [...this.lottos].map((lottos) => this.matchNumbers(lottos));
    const rankHash = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    for (let i = 0; i < rankCount.length; i++) {
      const match =
        rankCount[i] === 5 && [...this.lottos[i]].find((lotto) => lotto === this.bonusNumber) ? true : false;
      const rank = this.matchBonus(rankCount[i], match);
      if (rank === 0) continue;
      rankHash[rank] ? (rankHash[rank] += 1) : (rankHash[rank] = 1);
    }
    return rankHash;
  }

  matchNumbers(lottos) {
    return [...this.winningNumbers].reduce((count, winningNumber) => {
      const flag = [...lottos].find((item) => item === Number(winningNumber));
      return flag ? count + 1 : count;
    }, 0);
  }

  matchBonus(matchCount, bonusFlag) {
    const rankIndex = PRICE.find(({ match, bonus }) => {
      return Number(match) === matchCount && bonus === bonusFlag;
    });
    return rankIndex ? rankIndex.rank : 0;
  }
}
