import {
  isValidAmountUnit,
  hasDuplicatedValueInputs,
  getRandomNumber,
  getInputNumberValues,
  getMatchedValueCountInArray,
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

  #generatorLotto(amount) {
    const gameCount = amount / UNIT_AMOUNT;
    const games = new Array(gameCount).fill(0);

    this.#state.gameCount = gameCount;
    this.#state.lottos = games.map(this.#generateLottoNumbers);
  }

  checkWinnerNumber($winningNumbers, $bonusNumber) {
    const winningNumbers = getInputNumberValues($winningNumbers);
    const bonusNumber = Number($bonusNumber.value);

    const numberOfMatchedNumbers = this.#state.lottos.map((lotto) => {
      const matchedValueCount = getMatchedValueCountInArray(
        lotto,
        winningNumbers
      );
      const hasBonusNumber = !!lotto.find((num) => num === bonusNumber);

      if (matchedValueCount === 5 && hasBonusNumber) return "bonus";

      return matchedValueCount >= 3 && hasBonusNumber
        ? matchedValueCount + 1
        : matchedValueCount;
    });

    const result = numberOfMatchedNumbers.reduce((acc, cur) => {
      if (cur < 3) return acc;

      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

    this.#state.winningStatistics = result;
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
