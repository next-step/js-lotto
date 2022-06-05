import { getRandomInteger } from "./util.js";
import { RANDOM_INTEGER_CONDITION, LOTTO_LENGTH } from "./constants.js";

export class LottoService {
  constructor() {}

  #createLotto = () => {
    const lottoArray = Array(LOTTO_LENGTH)
      .fill(0)
      .map(() =>
        getRandomInteger(
          RANDOM_INTEGER_CONDITION.START,
          RANDOM_INTEGER_CONDITION.END
        )
      );
    const lottoSet = new Set(lottoArray);
    while (lottoSet.size < LOTTO_LENGTH) {
      lottoSet.add(
        getRandomInteger(
          RANDOM_INTEGER_CONDITION.START,
          RANDOM_INTEGER_CONDITION.END
        )
      );
    }
    return [...lottoSet];
  };

  getLottos = (inputPrice) => {
    const count = inputPrice / 1000;
    let lottos = [];
    for (let i = 0; i < count; i++) {
      const lotto = this.#createLotto();
      lottos.push(lotto);
    }
    return lottos;
  };

  getStatistics = (originalNumbers, bonusNumber, lottos) => {
    let result = [];
    lottos.forEach((lottoNumbers) => {
      let matchCount = 0;
      let hasMatchingBonusBall = false;
      lottoNumbers.forEach((lottoNumber) => {
        if (originalNumbers.includes(lottoNumber)) {
          matchCount++;
        }
        if (lottoNumber === bonusNumber) {
          hasMatchingBonusBall = true;
        }
      });
      result.push({ matchCount, hasMatchingBonusBall });
    });
    const statistic = {
      "3개": 0,
      "4개": 0,
      "5개": 0,
      "5개 + 보너스볼": 0,
      "6개": 0,
    };
    result.forEach((item) => {
      if (item.matchCount === 3) {
        statistic["3개"] += 1;
      }
      if (item.matchCount === 4) {
        statistic["4개"] += 1;
      }
      if (item.matchCount === 5) {
        statistic["5개"] += 1;
      }
      if (item.matchCount === 5 && item.hasMatchingBonusBall) {
        statistic["5개 + 보너스볼"] += 1;
      }
      if (item.matchCount === 6) {
        statistic["6개"] += 1;
      }
    });
    return statistic;
  };

  getProfit = (statistic, inputPrice) => {
    const profit = Math.floor(
      (statistic["3개"] * 5000 +
        statistic["4개"] * 50000 +
        statistic["5개"] * 1500000 +
        statistic["5개 + 보너스볼"] * 30000000 +
        statistic["6개"] * 2000000000 -
        inputPrice) /
        inputPrice
    );
    return profit;
  };
}
