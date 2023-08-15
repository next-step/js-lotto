import GAME_CODE from './constants/game-code.js';
import LottoGame from './controller/LottoGame.js';

class App {
  games = {};

  #addGame(game) {
    if (game === GAME_CODE.LOTTO) this.games[game] = new LottoGame();
  }

  startGame(game) {
    if (!this.games[game]) this.#addGame(game);
    this.games[game].start();
  }
}

export default App;
