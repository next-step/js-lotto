import { InputView } from '.';

export class View {
  #inputView;

  constructor() {
    this.#inputView = InputView;
  }

  async readPurchaseAmount() {
    return await this.#inputView.readUserInput('> 구입금액을 입력해 주세요.');
  }
}
