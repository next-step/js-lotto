import {
  LOTTO_AMOUNT_UNIT,
  QUESTION_LOTTO_ANSWER,
  QUESTION_LOTTO_BONUS,
  QUESTION_PURCHASE_AMOUNT,
  QUESTION_RESTART,
} from '../constants/lotto.const.js';
import { print } from '../utils/common.util.js';

class UserIO {
  #readline = null;

  constructor(readline) {
    this.#readline = readline;
  }

  inputPurchaseAmount() {
    return new Promise((resolve) => {
      this.#readline.question(QUESTION_PURCHASE_AMOUNT, (purchaseAmount) =>
        resolve(purchaseAmount)
      );
    });
  }

  inputLottoAnswer() {
    return new Promise((resolve) => {
      this.#readline.question(QUESTION_LOTTO_ANSWER, (lottoAnswer) =>
        resolve(lottoAnswer)
      );
    });
  }

  inputLottoBonus() {
    return new Promise((resolve) => {
      this.#readline.question(`\n${QUESTION_LOTTO_BONUS}`, (lottoBonus) =>
        resolve(lottoBonus)
      );
    });
  }

  inputRestart() {
    return new Promise((resolve) => {
      this.#readline.question(QUESTION_RESTART, (command) => resolve(command));
    });
  }

  outputAmount(purchasedLottoCounts) {
    print(`${purchasedLottoCounts}개를 구매했습니다.`);
  }

  outputMyLottos(myLottos) {
    myLottos.forEach((myLotto) => {
      print(myLotto);
    });
    print('');
  }

  outputWinStatistics(statistics, profitRate) {
    print('\n당첨 통계');
    print('--------------------');

    print(`3개 일치 (5,000원) - ${statistics['fifth place']}개`);
    print(`4개 일치 (50,000원) - ${statistics['fourth place']}개`);
    print(`5개 일치 (1,500,000원) - ${statistics['third place']}개`);
    print(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${statistics['second place']}개`
    );
    print(`6개 일치 (2,000,000,000원) - ${statistics['first place']}개`);
    print(`총 수익률은 ${profitRate.toFixed(0)}%입니다.`);
    print('');
  }

  outputErrorMessage(errorMsg) {
    print(errorMsg);
  }

  close() {
    this.#readline.close();
  }

  restartOrExit(command, startFn) {
    const c = command.toLowerCase();
    if (c === 'y') {
      print('');
      startFn();
    } else {
      this.close();
    }
  }
}

export default UserIO;
