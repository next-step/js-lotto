import readline from 'readline';
import {
  MESSAGE_PURCHASE_PRICE,
  MESSAGE_WINNING_NUMBERS,
  RADIX_INTEGER,
  LOTTO_5TH_PRIZE_WINNER,
  LOTTO_4TH_PRIZE_WINNER,
  LOTTO_3RD_PRIZE_WINNER,
  LOTTO_SECOND_PRIZE_WINNER,
  LOTTO_FIRST_PRIZE_WINNER,
} from '../constants';
import { filterArray } from '../utils';
import LottoValidator from '../domain/LottoValidator';

class LottoIO {
  constructor() {
    this.validator = new LottoValidator();
  }

  readLineAsync(query) {
    return new Promise((resolve, reject) => {
      try {
        this.validator.validateArguments(arguments);
        this.validator.validateQuery(query, 'string');
      } catch (error) {
        reject(error);
        return;
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
  async inputPurchasePrice() {
    const price = await this.readLineAsync(MESSAGE_PURCHASE_PRICE);
    this.validator.validInputNumber(price);
    return parseInt(price, RADIX_INTEGER);
  }

  async inputWinningNumbers() {
    try {
      const numbers = await this.readLineAsync(MESSAGE_WINNING_NUMBERS);
      this.validator.validWinningNumberSplitComma(numbers);
      const splitNumbers = numbers.split(',').map((number) => {
        this.validInputNumber(number);
        return parseInt(number, RADIX_INTEGER);
      });
      return splitNumbers;
    } catch (error) {
      console.log(error.message);
    }
  }

  async inputBonusNumber() {
    try {
      const number = await this.readLineAsync(MESSAGE_BONUS_NUMBER);
      this.validator.validInputNumber(number);
      return parseInt(number, RADIX_INTEGER);
    } catch (error) {
      console.log(error.message);
    }
  }

  outputPurchasedLottos(lottos) {
    lottos.forEach((lotto) => {
      console.log('lottos', lotto);
    });
  }

  outputLottosResult(lottoResult) {
    console.log('당첨 통계');
    console.log('--------------------');

    const result_5th = filterArray(lottoResult, LOTTO_5TH_PRIZE_WINNER);
    const result_4th = filterArray(lottoResult, LOTTO_4TH_PRIZE_WINNER);
    const result_3rd = filterArray(lottoResult, LOTTO_3RD_PRIZE_WINNER);
    const result_sec = filterArray(lottoResult, LOTTO_SECOND_PRIZE_WINNER);
    const result_first = filterArray(lottoResult, LOTTO_FIRST_PRIZE_WINNER);

    console.log(`3개 일치 (5,000원) - ${result_5th}개`);
    console.log(`4개 일치 (50,000원) - ${result_4th}개`);
    console.log(`5개 일치 (1,500,000원) - ${result_3rd}개`);
    console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${result_sec}개`);
    console.log(`6개 일치 (2,000,000,000원) - ${result_first}개`);
  }
}

export default LottoIO;
