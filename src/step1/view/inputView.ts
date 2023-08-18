import Console from '../utils/console';

const InputView = {
  async inputByUser(message: string) {
    const userInput = await Console.readLine(message);
    return userInput;
  },
};

export default InputView;
