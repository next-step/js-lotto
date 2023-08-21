import { Lotto } from './domain/Lotto.js';
import { LottoMachine } from './domain/LottoMachine.js';
import { WinningLotto } from './domain/WinningLotto.js';
import LottoView from './view/LottoVIew.js';

export class App {
  #lottoView;
  #lottoMachine;
  #lottos;
  #winningLotto;

  constructor() {
    this.#lottoMachine = new LottoMachine();
    this.#lottoView = new LottoView();
    this.#init().then(() => this.start());
  }

  async #init() {
    await this.#setLotto();
    await this.#setWinningLotto();
  }

  async #setLotto() {
    const purchaseAmount = await this.#lottoView.inputPurchaseAmount();
    this.#lottos = this.#lottoMachine.issueLotto(purchaseAmount);
    this.#lottoView.printPurchaseAmount(this.#lottos);
  }

  async #setWinningLotto() {
    const winningLottoNunbers =
      await await this.#lottoView.inputWinningNumber();
    const winningLottoArray = winningLottoNunbers
      .split(',')
      .map((string) => parseInt(string));
    const bonusNumber = await this.#lottoView.inputBonusNumber();
    this.#winningLotto = new WinningLotto(
      new Lotto(winningLottoArray),
      bonusNumber
    );
  }

  start() {
    const lottoResult = this.#lottoMachine.checkWinningLotto(
      this.#lottos,
      this.#winningLotto
    );
    this.#lottoView.printLottoResult(lottoResult);
  }
}
