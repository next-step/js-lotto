// eslint-disable-next-line import/no-unresolved
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'process';
import {
  ERROR_MESSAGES,
  GAME_MESSAGES,
  LOTTO_WINNING_MAP,
} from '../domain/constants.js';

const rl = createInterface({ input: stdin, output: stdout });

export default class View {
  static async askPrice() {
    const price = await View.#ask(GAME_MESSAGES.ASK_PRICE);
    return Number(price);
  }

  static async askWinNumbers() {
    const winNumbers = await View.#ask(GAME_MESSAGES.ASK_WIN_NUMBERS);
    return winNumbers.split(',').map(Number);
  }

  static async askBonusNumber() {
    const bonusNumber = await View.#ask(GAME_MESSAGES.ASK_BONUS_NUMBER);
    return Number(bonusNumber);
  }

  static printPurchasedLottos(lottos) {
    this.#print(lottos.length + GAME_MESSAGES.PURCHASED_SUFFIX);
    lottos.forEach(lotto => this.#print(lotto.numbers));
  }

  static printResult(winningResult, rateOfReturn) {
    this.#print(GAME_MESSAGES.ALERT_WINNING_RESULT);
    LOTTO_WINNING_MAP.forEach(v =>
      this.#printWinningResult(v, winningResult[v.rank]),
    );
    this.#print(`총 수익률은 ${rateOfReturn}%입니다.`);
  }

  static #printWinningResult(winningMap, number) {
    this.#print(
      `${winningMap.condition.n}개 일치${
        winningMap.condition.b ? ', 보너스 볼 일치' : ''
      } (${winningMap.prize.toLocaleString()}원) - ${number}개`,
    );
  }

  static printErrorMessage(message) {
    this.#print(ERROR_MESSAGES.PREFIX + message);
  }

  static end() {
    rl.close();
  }

  static #print(message) {
    console.log(message);
  }

  static async #ask(str) {
    this.#print('');
    const res = await rl.question(str);

    return res;
  }
}
