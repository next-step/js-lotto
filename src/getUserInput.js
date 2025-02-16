import readline from "readline";

export const checkInputTypeIsNumber = (input) => {
  return !Number.isNaN(Number(input));
};

export const checkCanBuyLotto = (input) => {
  return Number(input) >= 1000;
};

export const checkAllInputsTypeisNumber = (input) => {
  const inputArr = input.split(",");

  return inputArr.every((item) => checkInputTypeIsNumber(item));
};
export const checkInputsLengthValid = (input) => {
  const inputArr = input.split(",");

  return inputArr.length === 6;
};
export const checkBounsValid = (input) => {
  return input > 0 && input < 100;
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
        if (!checkCanBuyLotto(input)) {
          reject(new Error("1000 이상의 금액을 넣어주세요요."));
        }
        return;
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
        reject(new Error("숫자를 쉼표(,)로 구분해서 6개 입력해주세요"));
        return;
      }
      if (!checkAllInputsTypeisNumber(input)) {
        reject(new Error("숫자만 입력해주세요."));
        return;
      }
      resolve(input);
    });
  });
}

export function getBounsNumber(query) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(query, (input) => {
      rl.close();
      if (!checkAllInputsTypeisNumber(input)) {
        reject(new Error("숫자만 입력해주세요."));
        return;
      }
      if (!checkBounsValid(input)) {
        reject(new Error("1 - 99까지의 숫자만 입력해주세요."));
        return;
      }
      resolve(input);
    });
  });
}
