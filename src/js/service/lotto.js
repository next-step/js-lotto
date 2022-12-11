import { LOTTO } from "../constants/lotto.js";
import { createRandomNumbers } from "../utils/operate.js";

class Lotto {
  #lottos;
  #winningNumbers;
  #bonusNumber;
  #result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  #inputTotal = 0;
  #earningTotal = 0;

  issueLottos(number) {
    this.#lottos = Array.from(Array(number), () => createRandomNumbers());
    this.#inputTotal += number * 1000;
    return this.#lottos;
  }

  setWinningOrBonusNumber(numbers) {
    Array.isArray(numbers)
      ? (this.#winningNumbers = numbers)
      : (this.#bonusNumber = numbers);
  }

  checkResult() {
    this.#lottos.forEach((lotto) => {
      const rank = this.setRank(lotto);
      if (!rank) return;
      this.#result[rank] += 1;
      this.#earningTotal += LOTTO.PRIZE_MONEY[rank];
    });

    return {
      lottoResult: this.#result,
      earningTotal: this.#earningTotal,
      inputTotal: this.#inputTotal,
    };
  }

  setRank(lottoNumbers) {
    const { length: matchingNumberCount } = lottoNumbers.filter((lottoNumber) =>
      this.#winningNumbers.includes(lottoNumber)
    );

    if (matchingNumberCount < 3) return 0;
    if (matchingNumberCount === 5 && lottoNumbers.includes(this.#bonusNumber))
      return lottoRank["5+1"];
    return lottoRank[matchingNumberCount];
  }

  clearResult() {
    this.#result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  }

  initialize() {
    this.#lottos;
    this.#winningNumbers;
    this.#bonusNumber;
    this.#result = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    this.#inputTotal = 0;
    this.#earningTotal = 0;
  }
}

const lottoRank = {
  6: 1,
  "5+1": 2,
  5: 3,
  4: 4,
  3: 5,
};

export default new Lotto();
