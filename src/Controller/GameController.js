import { InputView } from '../View';

export class GameController {
  #view;

  constructor() {
    this.#view = InputView;
  }

  async visitStore() {
    const purchaseAmount = await this.#readPurchaseAmount();
  }

  async #readPurchaseAmount() {
    return await await this.#view.readUserInput('> 구입금액을 입력해 주세요.');
  }
}
