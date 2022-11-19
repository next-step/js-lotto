import { GAME } from "./constants.js";
import GameListView from "./GameListView.js";

class Game {
  #gameListView;

  constructor() {
    this.#gameListView = new GameListView();
  }

  makeGames(count) {
    const games = this.onGenerateGamesBy(count);
    this.#gameListView.render(games);
  }

  onGenerateGamesBy(count) {
    return Array(count)
      .fill()
      .map(() => this.getGameNumber());
  }

  getGameNumber() {
    const randomNumbers = new Set();
    while (randomNumbers.size !== GAME.MAX_SIZE) {
      const randomNumber = Math.floor(
        Math.random() * (GAME.MAX_NUMBER - GAME.MIN_NUMBER) + 1
      );
      randomNumbers.add(randomNumber);
    }

    return Array.from(randomNumbers);
  }
}

export default Game;
