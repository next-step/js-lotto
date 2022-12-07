import {
  isValidAmountUnit,
  hasDuplicatedValueInputs,
  getRandomNumber,
  getInputValuesAsNumber,
  getMatchedNumberCounts,
  getWinningStatistics,
} from "./utils.js";
import {
  LOTTO_GAME_COUNT,
  MAXIMUM_NUMBER,
  MESSAGE_ABOUT_DUPLICATION_NUMBER,
  MESSAGE_ABOUT_UNIT_OF_AMOUNT,
} from "./constants.js";

const UNIT_AMOUNT = 1000;

class Lotto {
  #state;

  constructor() {
    this.#state = {
      lottos: [],
      gameCount: 0,
      winningStatistics: {},
    };
  }

  get state() {
    return this.#state;
  }

  #generateLottoNumbers() {
    const numbers = new Set();

    while (numbers.size < LOTTO_GAME_COUNT) {
      const num = getRandomNumber(MAXIMUM_NUMBER);
      numbers.add(num);
    }

    return Array.from(numbers);
  }

  setLottos(lottos) {
    this.#state.lottos = lottos;
  }

  #generatorLotto(amount) {
    const gameCount = amount / UNIT_AMOUNT;
    const games = new Array(gameCount).fill(0);

    this.#state.gameCount = gameCount;
    const generatedLottos = games.map(this.#generateLottoNumbers);
    this.setLottos(generatedLottos);
  }

  checkWinnerNumber($winningNumbers, $bonusNumber) {
    const winningNumbers = getInputValuesAsNumber($winningNumbers);
    const bonusNumber = Number($bonusNumber.value);

    const numberOfMatchedNumbers = getMatchedNumberCounts(
      this.#state.lottos,
      winningNumbers,
      bonusNumber
    );

    this.#state.winningStatistics = getWinningStatistics(
      numberOfMatchedNumbers
    );
  }

  purchaseLotto(amount) {
    if (!isValidAmountUnit(amount)) {
      alert(MESSAGE_ABOUT_UNIT_OF_AMOUNT);
      return false;
    }

    this.#generatorLotto(amount);
    return true;
  }

  isValidNumbers($inputs, $bonusInput) {
    if (hasDuplicatedValueInputs($inputs, $bonusInput)) {
      alert(MESSAGE_ABOUT_DUPLICATION_NUMBER);
      return false;
    }
    return true;
  }
}

export default Lotto;
