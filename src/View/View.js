import { InputView } from '.';
import { Validator } from '../utils/Validator';

export class View {
  #inputView;
  #validator = Validator.View;

  constructor() {
    this.#inputView = InputView;
  }

  async readPurchaseAmount() {
    const userInput = await this.#inputView.readUserInput(
      '> 구입금액을 입력해 주세요.'
    );
    this.#validator.readPurchaseAmount(userInput);

    return userInput;
  }
}
