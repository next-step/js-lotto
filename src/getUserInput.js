import readline from "readline";

const checkInputTypeIsNumber = (input) => {
  return !Number.isNaN(Number(input));
};

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      if (!checkInputTypeIsNumber(input)) {
        reject(new Error("숫자만 입력해주세요."));
        return;
      }
      resolve(input);
    });
  });
}
