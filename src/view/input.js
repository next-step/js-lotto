import readline from "readline";
import { LottoStore } from "../domain/lotto-store.js";
import { Lotto } from "../domain/lotto.js";
import { LottoNumber } from "../domain/lotto-number.js";

export const RESTART_INPUT = {
  YES: "y",
  NO: "n",
};

function readLineAsync(query) {
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

export async function askRetry() {
  while (true) {
    const retry = await readLineAsync("다시 시작하시겠습니까? (y/n)");

    try {
      if (!Object.values(RESTART_INPUT).includes(retry)) {
        throw new TypeError("y 또는 n을 입력해주세요.");
      }
      return retry === RESTART_INPUT.YES;
    } catch (e) {
      console.log(e.message);
    }
  }
}

export async function askLottoPrice() {
  while (true) {
    const lottoPrice = await readLineAsync("구매금액을 입력해 주세요.");

    try {
      return new LottoStore(lottoPrice);
    } catch (e) {
      console.log(e.message);
    }
  }
}

export async function askWinningLotto() {
  while (true) {
    const winningNumbersInput = await readLineAsync(
      "당첨 번호를 입력해 주세요."
    );

    try {
      return Lotto.from(winningNumbersInput);
    } catch (e) {
      console.log(e.message);
    }
  }
}

/**
 *
 * @param {LottoStore} lottoStore
 * @param {Lotto} winningLotto
 */
export async function askBonusNumber(lottoStore, winningLotto) {
  while (true) {
    const bonusNumberInput = await readLineAsync(
      "보너스 번호를 입력해 주세요."
    );

    try {
      const bonusNumber = LottoNumber.from(bonusNumberInput);
      lottoStore.validateBonusNumber(winningLotto, bonusNumber);
      return bonusNumber;
    } catch (e) {
      console.log(e.message);
    }
  }
}
