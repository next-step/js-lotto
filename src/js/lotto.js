import { checkAmountUnit } from "./utils.js";
import { MESSAGE_ABOUT_UNIT_OF_AMOUNT } from "./constants.js";

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
    const game = new Array(6).fill(0);

    game.forEach((g, index) => {
      let num = Math.floor(Math.random() * 44) + 1;
      while (game.includes(num)) {
        num = Math.floor(Math.random() * 44) + 1;
      }
      game[index] = num;
    });

    return game;
  }

  #generatorLotto(amount) {
    const gameCount = amount / UNIT_AMOUNT;
    const games = new Array(gameCount).fill(0);

    this.#state.gameCount = gameCount;
    this.#state.lottos = games.map(() => this.#generateLottoNumbers());
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
