import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const getUserInput = (consoleMessage, fn) => {
  readlineInterface.question(consoleMessage, fn);
};

export const closeUserInput = () => {
  readlineInterface.close();
};
