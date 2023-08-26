import { ERROR_MESSAGE } from '../constants/error-message.js';
import { LOTTO_AMOUNT_UNIT } from '../constants/lotto.js';
import { Lotto } from '../domain/Lotto.js';
import { LottoMachine } from '../domain/LottoMachine.js';
import { LottoNumberGenerator } from '../domain/LottoNumberGenerator.js';
import { WinningLotto } from '../domain/WinningLotto.js';
import LottoView from './LottoVIew.js';

export class LottoController {
  #lottoView;
  #lottoMachine;
  #lottos;
  #winningLotto;

  constructor() {
    this.#lottoMachine = new LottoMachine(LottoNumberGenerator);
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

    await this.#restart();

    this.#lottoView.closeInput();
  }

  async #restart() {
    try {
      const inputValue = await this.#lottoView.inputRestart();
      if (this.#isRestart(inputValue)) {
        await this.start();
      }
    } catch (error) {
      this.#lottoView.printError(error);
      await this.#restart();
    }
  }

  async #setLotto() {
    try {
      const purchaseAmount = await this.#lottoView.inputPurchaseAmount();
      this.#lottos = this.#lottoMachine.issueLotto(purchaseAmount);
      this.#lottoView.printPurchaseAmount(this.#lottos);
    } catch (error) {
      this.#lottoView.printError(error);
      await this.#setLotto();
    }
  }

  async #setWinningLotto() {
    try {
      const winningLottoNunbers = await this.#lottoView.inputWinningNumber();
      const bonusNumber = await this.#lottoView.inputBonusNumber();
      this.#winningLotto = new WinningLotto(
        new Lotto(winningLottoNunbers.split(',')),
        bonusNumber
      );
    } catch (error) {
      this.#lottoView.printError(error);
      await this.#setWinningLotto();
    }
  }

  #isRestart(value) {
    if (value === 'y' || value === 'n') {
      return value === 'y' ? true : false;
    }
    throw new Error(ERROR_MESSAGE.NOT_VALID_RESTART_ANSWER);
  }
}
