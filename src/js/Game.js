import { GAME } from "./constants.js";
import GameView from "./GameView.js";
import { getLottoRandomNumber } from "./utils.js";

class Game {
  #gameListView;

  constructor() {
    this.#gameListView = new GameView();
  }

  makeGames(count) {
    const games = this.onGenerateGamesBy(count);
    this.#gameListView.render(games);
  }

  onGenerateGamesBy(count) {
    return [...Array(count)].map(() => this.getGameNumber());
  }

  getGameNumber() {
    const randomNumbers = new Set();
    while (randomNumbers.size !== GAME.MAX_SIZE) {
      const randomNumber = getLottoRandomNumber();
      randomNumbers.add(randomNumber);
    }

    return Array.from(randomNumbers);
  }
}

export default Game;
