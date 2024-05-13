import readline from "readline";

export function isNumber(value) {
  const number = Number(value);

  if (value <= 0) {
    return false;
  }

  return typeof number === "number" && !isNaN(number);
}

/**
 * 터미널에서 입출력 받을 수 있게 하는 함수.
 * 제공받은 함수기 때문에 따로 뭐 하신 않으려고 함
 */
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
