import { Console } from '../utils';
import { Validator } from '../utils/Validator';

export const InputView = {
  async readUserInput(message) {
    const userInput = await Console.readLine(message);
    Validator.View.readUserInput(userInput);

    return userInput;
  },

  close() {
    Console.close();
  },
};
