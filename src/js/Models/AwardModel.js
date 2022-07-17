import { PRICE_PER_LOTTO, BONUS_AWARD, WINNINGS, THIRD_AWARD } from "../utils/constants.js";
import { Model } from "./Model.js";

export class AwardModel extends Model {
  drawLotto(lottos, result) {
    const winningCount = this.getWinningCount(lottos, result);
    const reward = this.getReward(winningCount);
    const revenue = this.getRevenue(lottos, reward);
    this.state = { reward, revenue };
    this.showAward();
  }

  getTotalReward(reward) {
    return Object.values(reward).reduce((total, { amount }) => total + amount, 0);
  }

  getRevenue(lottos, reward) {
    const totalReward = this.getTotalReward(reward);
    const charge = lottos.length * PRICE_PER_LOTTO;
    if (charge === 0) return 0;
    return Math.round(((totalReward - charge) / charge) * 100);
  }

  getReward(winningCount) {
    return Object.entries(winningCount).reduce((reward, [index, count]) => {
      const winning = WINNINGS[index];
      if (!winning) return reward;
      reward[index] = {
        amount: winning * count,
        count,
      };
      return reward;
    }, {});
  }

  getWinningCount(lottos, result) {
    const { winningNumbers, bonusNumber } = result;
    return lottos.reduce((count, lotto) => {
      let numOfWins = this.checkWinningNumbers(winningNumbers, lotto);
      if (numOfWins === THIRD_AWARD && lotto.includes(bonusNumber)) {
        numOfWins = BONUS_AWARD;
      }
      const prev = count[numOfWins] ?? 0;
      count[numOfWins] = prev + 1;
      return count;
    }, {});
  }

  checkWinningNumbers(winningNumbers, lotto) {
    return winningNumbers.length + lotto.length - new Set(winningNumbers.concat(lotto)).size;
  }

  showAward() {
    this.state = {
      isShowAward: true,
    };
  }

  closeAward() {
    this.state = {
      isShowAward: false,
    };
  }
}
