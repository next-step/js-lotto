import readline from "readline";

export const RESTART_INPUT = {
  YES: "y",
  NO: "n",
};

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments must be 1"));
    }

    if (typeof query !== "string") {
      reject(new Error("query must be string"));
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

export function askRetry(input) {
  if (!Object.values(RESTART_INPUT).includes(input)) {
    throw new TypeError("y 또는 n을 입력해주세요.");
  }
  return input === RESTART_INPUT.YES;
}