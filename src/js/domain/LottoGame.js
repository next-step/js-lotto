import { LOTTO_GAME } from "../../constants/LottoGame";
import { LOTTO } from "../../constants/lotto";
export class LottoGame {
  #lottos;
  #winningNumbers;
  #bonusNumber;
  #result;
  constructor(lottos, winnerNumbers, bonusNumber) {
    this.#lottos = lottos;
    this.#winningNumbers = winnerNumbers;
    this.#bonusNumber = bonusNumber;
    this.#result = new Map(
      Array.from({ length: LOTTO_GAME.MAX_RANK }, (_, index) => [index + 1, 0])
    );
  }

  #checkUnitLotto(lotto) {
    const checkResult = lotto.filter((number) =>
      this.#winningNumbers.includes(number)
    ).length;

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
        return 0;
    }
  };

  checkLottos() {
    this.#lottos.map((lotto) =>
      this.#result.set(
        this.#checkUnitLotto(lotto),
        this.#result.get(this.#checkUnitLotto(lotto)) + 1
      )
    );
  }

  get result() {
    return this.#result;
  }
}
