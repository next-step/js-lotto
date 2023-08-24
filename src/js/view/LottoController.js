import { LOTTO_AMOUNT_UNIT } from '../constants/lotto.js';
import { Lotto } from '../domain/Lotto.js';
import { LottoMachine } from '../domain/LottoMachine.js';
import { WinningLotto } from '../domain/WinningLotto.js';
import LottoView from './LottoVIew.js';

export class LottoController {
  #lottoView;
  #lottoMachine;
  #lottos;
  #winningLotto;

  constructor() {
    this.#lottoMachine = new LottoMachine();
    this.#lottoView = new LottoView();
  }

  async start() {
    await this.#setLotto();
    await this.#setWinningLotto();

    const lottoResult = this.#lottoMachine.checkWinningLotto(
      this.#lottos,
      this.#winningLotto
    );

    const purchaseAmount = this.#lottos.length * LOTTO_AMOUNT_UNIT;
    this.#lottoView.printLottoResult(lottoResult, purchaseAmount);
  }

  async #setLotto() {
    const purchaseAmount = await this.#lottoView.inputPurchaseAmount();
    this.#lottos = this.#lottoMachine.issueLotto(purchaseAmount);
    this.#lottoView.printPurchaseAmount(this.#lottos);
  }

  async #setWinningLotto() {
    const winningLottoNunbers = await this.#lottoView.inputWinningNumber();
    const winningLottoArray = winningLottoNunbers
      .split(',')
      .map((string) => parseInt(string));
    const bonusNumber = await this.#lottoView.inputBonusNumber();
    this.#winningLotto = new WinningLotto(
      new Lotto(winningLottoArray),
      bonusNumber
    );
  }
}
