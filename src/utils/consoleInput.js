import readline from "readline";

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const getUserInput = (consoleMessage) => {
  return new Promise((resolve) => {
    readlineInterface.question(consoleMessage, (inputValue) => {
      resolve(inputValue);
    });
  });
};

export const closeUserInput = () => {
  readlineInterface.close();
};
