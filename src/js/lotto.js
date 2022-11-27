import { checkAmountUnit, getRandomNumber } from "./utils.js";
import {
  LOTTO_GAME_COUNT,
  MAXIMUM_NUMBER,
  MESSAGE_ABOUT_UNIT_OF_AMOUNT,
} from "./constants.js";

const UNIT_AMOUNT = 1000;

class Lotto {
  #state;

  constructor() {
    this.#state = {
      lottos: [],
      gameCount: 0,
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

  purchaseLotto(amount) {
    if (!checkAmountUnit(amount)) {
      alert(MESSAGE_ABOUT_UNIT_OF_AMOUNT);
      return;
    }

    this.#generatorLotto(amount);
  }
}

export default Lotto;
