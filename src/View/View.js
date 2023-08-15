import { InputView } from '.';
import { Validator } from '../utils/Validator';
import { MESSAGE } from '../constants';

export class View {
  #inputView;
  #validator = Validator.View;

  constructor() {
    this.#inputView = InputView;
  }

  async readPurchaseAmount() {
    const userInput = await this.#inputView.readUserInput(
      MESSAGE.PREFIX(MESSAGE.READ.PURCHASE_AMOUNT)
    );
    this.#validator.readPurchaseAmount(userInput);

    return userInput;
  }
}
