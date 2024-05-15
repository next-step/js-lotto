import readline from 'node:readline';
import { ERROR_MESSAGE } from '../constants';

export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error('arguments must be 1'));
    }

    if (typeof query !== 'string') {
      reject(new Error('query must be string'));
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

export function calcROI(netReturn, investmentCost) {
  return (netReturn / investmentCost) * 100;
}

export function comma(money) {
  if (
    typeof money !== 'number' ||
    !Number.isInteger(money) ||
    money > Number.MAX_SAFE_INTEGER
  ) {
    throw new TypeError(ERROR_MESSAGE.INVALID_PARAMETER);
  }
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
