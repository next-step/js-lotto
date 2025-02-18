import readline from "readline";
import {
  checkInputTypeIsNumber,
  checkCanBuyLotto,
  checkAllInputsTypeisNumber,
  checkInputsLengthValid,
  checkBonusValid,
  checkUserAnswerValid,
  checkUserAnswer,
} from "./checkValidation.js";

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      if (!checkInputTypeIsNumber(input)) {
        return reject(new Error("숫자만 입력해주세요."));
      }
      if (!checkCanBuyLotto(input)) {
        return reject(new Error("1000 이상의 금액을 넣어주세요."));
      }

      resolve(input);
    });
  });
}
export function getWinningNumbers(query) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      if (!checkInputsLengthValid(input)) {
        return reject(new Error("숫자를 쉼표(,)로 구분해서 6개 입력해주세요"));
      }
      if (!checkAllInputsTypeisNumber(input)) {
        return reject(new Error("숫자만 입력해주세요."));
      }
      resolve(input);
    });
  });
}

export function getBonusNumber(query) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      if (!checkAllInputsTypeisNumber(input)) {
        return reject(new Error("숫자만 입력해주세요."));
      }
      if (!checkBonusValid(input)) {
        return reject(new Error("1 - 45 까지의 숫자만 입력해주세요."));
      }
      resolve(input);
    });
  });
}
export function IsUserRetry() {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("다시 시작하시겠습니까? (y/n) ", (input) => {
      rl.close();
      if (!checkUserAnswerValid(input)) {
        return reject(new Error("y와 n 중 하나의 값을 입력하세요."));
      }
      if (!checkBonusValid(input)) {
        return reject(new Error("1 - 45 까지의 숫자만 입력해주세요."));
      }
      resolve(input);
    });
  });
}
