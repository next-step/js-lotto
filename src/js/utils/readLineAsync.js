import readline from "readline";

function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error("arguments는 1개만 허용됩니다."));
    }

    if (typeof query !== "string") {
      reject(new Error("query는 string 타입이어야 합니다."));
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

export default readLineAsync;
