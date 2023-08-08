import Console from '../utils/console.js';

const InputView = {
  async inputByUser(message) {
    const userInput = await Console.readLine(message);
    return userInput;
  },
};

export default InputView;
