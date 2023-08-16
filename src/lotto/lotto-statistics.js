import {
  LOTTO_CALCULATED_RANK,
  LOTTO_SECOND_PLACE_DEFAULT_COUNT,
} from '../constants/lotto.const.js';

class LottoStatistics {
  #statistics = {
    'first place': 0,
    'second place': 0,
    'third place': 0,
    'fourth place': 0,
    'fifth place': 0,
    'no luck': 0,
  };

  constructor() {}

  getStatistics() {
    return this.#statistics;
  }

  setStatistics(myLottos, lottoAnswer, lottoBonus) {
    myLottos.forEach((myLotto) => {
      let answerCount = 0;
      lottoAnswer.forEach((answer) => {
        if (myLotto.includes(answer)) {
          answerCount += 1;
        }
      });
      if (
        answerCount === LOTTO_SECOND_PLACE_DEFAULT_COUNT &&
        myLotto.includes(lottoBonus)
      ) {
        this.#statistics['second place'] += 1;
      } else {
        const rank = this.calculateRank(answerCount);
        this.#statistics[rank] += 1;
      }
    });
  }

  calculateRank(count) {
    if (count in LOTTO_CALCULATED_RANK) {
      return LOTTO_CALCULATED_RANK[count];
    }

    return 'no luck';
  }
}

export default LottoStatistics;
