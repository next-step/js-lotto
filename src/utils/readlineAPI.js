import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = prompt => {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
};

export { rl, askQuestion };
