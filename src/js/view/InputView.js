import { createInterface } from 'node:readline/promises';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

class InputView {
  async _getUserInput(question) {
    const answer = await rl.question(question);
    return answer;
  }
}

export default InputView;
