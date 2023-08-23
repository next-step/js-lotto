import { createInterface } from 'node:readline/promises';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

class InputView {
  _getUserInput(question) {
    return rl.question(question);
  }
}

export default InputView;
