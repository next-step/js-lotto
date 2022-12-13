import {
  hasDuplicatedValueInArray,
  getRandomNumber,
  getInputValuesAsNumber,
  getMatchedNumberCounts,
  getWinningStatistics,
  getInputValuesWithArray,
  ValidationError,
} from "./utils.js";
import {
  LOTTO_GAME_COUNT,
  MAXIMUM_NUMBER,
  MESSAGE_ABOUT_DUPLICATION_NUMBER,
  MESSAGE_ABOUT_ENTERED_OUTSTANDING_AMOUNT,
} from "./constants.js";

const UNIT_AMOUNT = 1000;
const INITIAL_LOTTO_GAME = [0, 0, 0, 0, 0, 0];
const INITIAL_LOTTO_STATE = {
  manualLottos: [],
  lottos: [],
  gameCount: 0,
  winningStatistics: {},
};

class Lotto {
  #state;

  constructor() {
    this.#state = JSON.parse(JSON.stringify(INITIAL_LOTTO_STATE));
  }

  get state() {
    return this.#state;
  }

  createManualLotto() {
    this.#state.manualLottos.push([...INITIAL_LOTTO_GAME]);
  }

  setLottos(lottos) {
    this.#state.lottos = lottos;
  }

  #generateLottoNumbers() {
    const numbers = new Set();

    while (numbers.size < LOTTO_GAME_COUNT) {
      const num = getRandomNumber(MAXIMUM_NUMBER);
      numbers.add(num);
    }

    return Array.from(numbers);
  }

  #generatorLotto(autoMaticGameAmount) {
    const autoMaticGameCount = autoMaticGameAmount / UNIT_AMOUNT;
    const games = new Array(autoMaticGameCount).fill(0);
    let generatedLottos = games.map(this.#generateLottoNumbers);

    if (this.#state.manualLottos.length > 0) {
      generatedLottos = generatedLottos.concat(this.#state.manualLottos);
    }

    this.#state.gameCount =
      autoMaticGameCount + this.#state.manualLottos.length;
    this.setLottos(generatedLottos);
  }

  setManualLottos(manualList) {
    const manualLottos = Array.from(manualList.children);
    const manualLottoValues = manualLottos
      .map(($lotto) =>
        Array.from($lotto.children).map(($input) => Number($input.value))
      )
      .reverse();
    this.#state.manualLottos = manualLottoValues;
  }

  purchaseLotto(amount) {
    const amountForAutomaticPurchase =
      amount - this.#state.manualLottos.length * UNIT_AMOUNT;

    this.#generatorLotto(amountForAutomaticPurchase);
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

  checkValidAmount(amount) {
    const amountForAutomaticPurchase =
      amount - this.#state.manualLottos.length * UNIT_AMOUNT;

    if (amountForAutomaticPurchase < 0) {
      throw new ValidationError(MESSAGE_ABOUT_ENTERED_OUTSTANDING_AMOUNT);
    }
  }

  checkValidManualLottoNumbers() {
    const hasManualLottos = this.state.manualLottos.length > 0;
    const isValidManualLottoNumbers =
      this.#state.manualLottos.map(hasDuplicatedValueInArray).includes(true) ===
      false;

    if (hasManualLottos && !isValidManualLottoNumbers) {
      throw new ValidationError(MESSAGE_ABOUT_DUPLICATION_NUMBER);
    }
  }

  isValidWinningNumbers($inputs, $bonusInput) {
    const inputValues = getInputValuesWithArray([...$inputs, $bonusInput]);

    if (hasDuplicatedValueInArray(inputValues)) {
      alert(MESSAGE_ABOUT_DUPLICATION_NUMBER);
      return false;
    }
    return true;
  }

  reset() {
    this.#state = JSON.parse(JSON.stringify(INITIAL_LOTTO_STATE));
  }
}

export default Lotto;
