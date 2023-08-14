import { LOTTO_REWARD_CODE, LOTTO_REWARD_CONDITION } from '../constants/lotto-config.js';

class LottoChecker {
  #firstMatchCount = LOTTO_REWARD_CONDITION[LOTTO_REWARD_CODE.FIRST].matchedCount;

  #secondMatchCount = LOTTO_REWARD_CONDITION[LOTTO_REWARD_CODE.SECOND].matchedCount;

  #thirdMatchCount = LOTTO_REWARD_CONDITION[LOTTO_REWARD_CODE.THIRD].matchedCount;

  #fourthMatchCount = LOTTO_REWARD_CONDITION[LOTTO_REWARD_CODE.FOURTH].matchedCount;

  #fifthMatchCount = LOTTO_REWARD_CONDITION[LOTTO_REWARD_CODE.FIFTH].matchedCount;

  static makeLottoRewardBoard() {
    return Object.values(LOTTO_REWARD_CODE).reduce((acc, currentValue) => {
      acc[currentValue] = 0;
      return acc;
    }, {});
  }

  getLottoReward({ matchCount, hasBonus }) {
    if (matchCount === this.#firstMatchCount) return LOTTO_REWARD_CODE.FIRST;
    if (matchCount === this.#secondMatchCount && hasBonus) return LOTTO_REWARD_CODE.SECOND;
    if (matchCount === this.#thirdMatchCount) return LOTTO_REWARD_CODE.THIRD;
    if (matchCount === this.#fourthMatchCount) return LOTTO_REWARD_CODE.FOURTH;
    if (matchCount === this.#fifthMatchCount) return LOTTO_REWARD_CODE.FIFTH;
    return null;
  }

  getLottoRewardBoard(lottos) {
    const lottoRewardBoard = LottoChecker.makeLottoRewardBoard();
    lottos.forEach((lotto) => {
      const reward = this.getLottoReward(lotto);
      if (reward) lottoRewardBoard[reward] += 1;
    });
    return lottoRewardBoard;
  }
}

export default LottoChecker;
