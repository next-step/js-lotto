import { Console } from '../utils';

export const InputView = {
  async readUserInput(message) {
    return await Console.readLine(message);
  },
};
