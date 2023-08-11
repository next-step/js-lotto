import LottoGame from './controller/LottoGame.js';
import Exchange from './domain/Exchange.js';

class App {
  games = {};

  #exchange = new Exchange();

  #addGame(game) {
    if (game === 'lotto') this.games[game] = new LottoGame(this.#exchange);
  }

  startGame(game) {
    if (!this.games[game]) this.#addGame(game);
    this.games[game].start();
  }
}

export default App;
