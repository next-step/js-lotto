// eslint-disable-next-line import/no-unresolved
import { createInterface } from 'node:readline/promises';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

class InputView {
  #inputView;

  constructor(inputView = (question) => rl.question(question)) {
    this.#inputView = inputView;
  }

  input(question) {
    return this.#inputView(question);
  }
}

export default InputView;
