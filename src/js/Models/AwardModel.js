import { PRICE_PER_LOTTO, BONUS_AWARD, WINNINGS, THIRD_AWARD } from "../utils/constants.js";
import { isLottoNumber, isDuplicated } from "../utils/validator.js";

import { Model } from "./Model.js";

export class AwardModel extends Model {
  drawLotto(lottos, result) {
    this.#validateLottos(lottos);
    this.#validateResult(result);
    const winningCount = this.#getWinningCount(lottos, result);
    const reward = this.#getReward(winningCount);
    const revenue = this.#getRevenue(lottos, reward);
    this.state = { reward, revenue };
    this.showAward();
  }

  #validateLottos(lottos) {
    if (lottos.length === 0) {
      throw new Error("먼저 로또를 구매해주세요.");
    }
  }

  #validateResult(result) {
    const { winningNumbers, bonusNumber } = result;
    this.#validateWinningNumbers(winningNumbers);
    this.#validateBonusNumber(bonusNumber);
    this.#checkIsDuplicated(winningNumbers, bonusNumber);
  }

  #validateWinningNumbers(winningNumbers) {
    if (winningNumbers.length !== 6) {
      throw new Error("당첨 번호는 6자리 모두 입력해주세요");
    }

    if (winningNumbers.every(isLottoNumber)) return;
    throw new Error("당첨 번호에 1 ~ 45사이 숫자를 입력해 주세요.");
  }

  #checkIsDuplicated(winningNumbers, bonusNumber) {
    if (isDuplicated(...winningNumbers, bonusNumber)) {
      throw new Error("중복된 숫자는 입력할 수 없습니다.");
    }
  }

  #validateBonusNumber(bonusNumber) {
    if (isLottoNumber(bonusNumber)) return;
    throw new Error("보너스 번호에 1 ~ 45사이 숫자를 입력해 주세요.");
  }

  #getTotalReward(reward) {
    return Object.values(reward).reduce((total, { amount }) => total + amount, 0);
  }

  #getRevenue(lottos, reward) {
    const totalReward = this.#getTotalReward(reward);
    const charge = lottos.length * PRICE_PER_LOTTO;
    if (charge === 0) return 0;
    return Math.round(((totalReward - charge) / charge) * 100);
  }

  #getReward(winningCount) {
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

  #getWinningCount(lottos, result) {
    const { winningNumbers, bonusNumber } = result;
    return lottos.reduce((count, lotto) => {
      let numOfWins = this.#checkWinningNumbers(winningNumbers, lotto);
      if (numOfWins === THIRD_AWARD && lotto.includes(bonusNumber)) {
        numOfWins = BONUS_AWARD;
      }
      const prev = count[numOfWins] ?? 0;
      count[numOfWins] = prev + 1;
      return count;
    }, {});
  }

  #checkWinningNumbers(winningNumbers, lotto) {
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
