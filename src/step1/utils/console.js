import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const createReadMachine = () => {
  const readMachine = readline.createInterface({
    input,
    output,
  });
  return readMachine;
};

const Console = {
  async readLine(message) {
    const readMachine = createReadMachine();
    const userInput = await readMachine.question(message);
    readMachine.close();
    return userInput;
  },
  print(message) {
    console.log(message);
  },
};

export default Console;
