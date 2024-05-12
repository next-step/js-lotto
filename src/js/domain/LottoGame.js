import { LOTTO_GAME } from "../../constants/LottoGame";
import { LOTTO } from "../../constants/lotto";
import { initMap } from "../../utils/initMap";
export class LottoGame {
  #lottos;
  #winningNumbers;
  #bonusNumber;
  #result;
  constructor(lottos, winnerNumbers, bonusNumber) {
    this.#lottos = lottos;
    this.#winningNumbers = winnerNumbers;
    this.#bonusNumber = bonusNumber;
    this.#result = initMap(LOTTO_GAME.MAX_RANK);
  }

  #checkUnitLotto(lotto) {
    const checkResult = lotto.filter((number) => this.#winningNumbers.includes(number)).length;

    return this.#convertCheckResultToRank(lotto, checkResult);
  }

  #convertCheckResultToRank = (lotto, checkResult) => {
    switch (checkResult) {
      case LOTTO.NUMBERS_COUNT - 3:
        return 5;
      case LOTTO.NUMBERS_COUNT - 2:
        return 4;
      case LOTTO.NUMBERS_COUNT - 1:
        return lotto.includes(this.#bonusNumber) ? 2 : 3;
      case LOTTO.NUMBERS_COUNT:
        return 1;
      default:
        return LOTTO.NUMBERS_COUNT;
    }
  };

  setResult(key, value) {
    this.#result.set(key, value);
  }

  checkLottos() {
    this.#lottos.map((lotto) =>
      this.setResult(this.#checkUnitLotto(lotto), this.#result.get(this.#checkUnitLotto(lotto)) + 1)
    );
  }

  get result() {
    return this.#result;
  }

  get totalRateOfReturn() {
    const prizes = [
      WINNINGS.FIRST_PRIZE,
      LOTTO_GAME.SECOND_PRIZE,
      LOTTO_GAME.THIRD_PRIZE,
      LOTTO_GAME.FOURTH_PRIZE,
      LOTTO_GAME.FIFTH_PRIZE,
    ];
    return prizes.reduce((total, prize, index) => total + this.#result.get(index + 1) * prize, 0);
  }
}
