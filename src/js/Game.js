import { GAME } from "./constants.js";
import GameView from "./GameView.js";

class Game {
  #gameView;

  constructor() {
    this.#gameView = new GameView();
  }

  makeGames(count) {
    const games = this.onGenerateGamesBy(count);
    this.#gameView.render(games);
  }

  onGenerateGamesBy(count) {
    return [...Array(count)].map(() => this.getGameNumber());
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
