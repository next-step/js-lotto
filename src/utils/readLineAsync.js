import readline from "readline";
import { ERROR_CODES } from "../constants/error";

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error(ERROR_CODES.ERROR_EMPTY_INPUT_LEN));
    }

    if (typeof query !== "string") {
      reject(new Error(ERROR_CODES.ERROR_INPUT_QUERY_TYPE));
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
