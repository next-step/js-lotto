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
      Array.from({ length: LOTTO.NUMBERS_COUNT }, (_, index) => [index + 1, 0])
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
      case 3:
        return 5;
      case 4:
        return 4;
      case 5:
        return lotto.includes(this.#bonusNumber) ? 2 : 3;
      case 6:
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
