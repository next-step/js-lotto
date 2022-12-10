import {
  hasDuplicatedValueInArray,
  getRandomNumber,
  getInputValuesAsNumber,
  getMatchedNumberCounts,
  getWinningStatistics,
  getInputValuesWithArray,
} from "./utils.js";
import {
  LOTTO_GAME_COUNT,
  MAXIMUM_NUMBER,
  MESSAGE_ABOUT_DUPLICATION_NUMBER,
} from "./constants.js";

const UNIT_AMOUNT = 1000;
const INITIAL_LOTTO_GAME = ["", "", "", "", "", ""];

class Lotto {
  #state;

  constructor() {
    this.#state = {
      manualLottos: [],
      lottos: [],
      gameCount: 0,
      winningStatistics: {},
    };
  }

  get state() {
    return this.#state;
  }

  createManualLotto() {
    this.#state.manualLottos.push(INITIAL_LOTTO_GAME);
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
    const generatedLottos = games.map(this.#generateLottoNumbers);

    this.#state.gameCount = gameCount;
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
    this.#generatorLotto(amount);
  }

  isValidWinningNumbers($inputs, $bonusInput) {
    const inputValues = getInputValuesWithArray([...$inputs, $bonusInput]);

    if (hasDuplicatedValueInArray(inputValues)) {
      alert(MESSAGE_ABOUT_DUPLICATION_NUMBER);
      return false;
    }
    return true;
  }
}

export default Lotto;
