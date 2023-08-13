import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const createReadlineInterface = () => readline.createInterface({ input, output });

const Console = {
  async readLine(message) {
    const readLineInterface = createReadlineInterface();
    const userInput = await readLineInterface.question(message);
    readLineInterface.close();
    return userInput;
  },
  print(message) {
    console.log(message);
  },
};

export default Console;
