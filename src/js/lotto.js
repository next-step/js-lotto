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
    this.#state = INITIAL_LOTTO_STATE;
  }

  get state() {
    return this.#state;
  }

  createManualLotto() {
    this.#state.manualLottos.push([...INITIAL_LOTTO_GAME]);
  }

  onInputManualLottoNumber({ value, lottoIndex, numberIndex }) {
    this.#state.manualLottos[lottoIndex][numberIndex] = value;
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

  isValidAmount(amount) {
    const amountForAutomaticPurchase =
      amount - this.#state.manualLottos.length * UNIT_AMOUNT;
    return amountForAutomaticPurchase >= 0;
  }

  isValidManualLottoNumbers() {
    return (
      this.#state.manualLottos.map(hasDuplicatedValueInArray).includes(true) ===
      false
    );
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
