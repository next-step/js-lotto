import { Validator } from '../../utils/Validator';

export const InputViewWeb = {
  async readUserInput(message) {
    const userInput = await Console.readLine(message);
    Validator.View.readUserInput(userInput);

    return userInput;
  },

  close() {
    Console.close();
  },
};
