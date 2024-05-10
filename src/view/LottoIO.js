import readline from 'readline';
import {
  LOTTO_3RD_PRIZE_WINNER,
  LOTTO_4TH_PRIZE_WINNER,
  LOTTO_5TH_PRIZE_WINNER,
  LOTTO_FIRST_PRIZE_WINNER,
  LOTTO_SECOND_PRIZE_WINNER,
  RADIX_INTEGER,
} from '../domain/LottoMachine';

export const ERROR_MESSAGE_INPUT_PURCHASE_PRICE = '입력 값은 숫자만 입력 가능합니다.';
export const ERROR_MESSAGE_COMMA_SEPARTED = '로또 당첨번호 구분은 쉼표(,)로 가능합니다.';

const MESSAGE_PURCHASE_PRICE = '> 구입금액을 입력해 주세요.';
const MESSAGE_WINNING_NUMBERS = '> 당첨 번호를 입력해 주세요.';
const MESSAGE_BONUS_NUMBER = '> 보너스 번호를 입력해 주세요.';

const MIN_INPUT_NUMBERS_LENGTH = 1;

class LottoIO {
  readLineAsync(query) {
    return new Promise((resolve, reject) => {
      if (arguments.length !== 1) {
        reject(new Error(ERROR_MESSAGE_ACGUMENTS_LENGTH));
      }

      if (typeof query !== 'string') {
        reject(new Error(ERROR_MESSAGE_QUERY_TYPE));
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

  validInputNumber(price) {
    if (Number.isNaN(Number(price))) throw new Error(ERROR_MESSAGE_INPUT_PURCHASE_PRICE);
  }

  validWinningNumberSplitComma(numbers) {
    if (numbers.split(',').length <= MIN_INPUT_NUMBERS_LENGTH) {
      throw new Error(ERROR_MESSAGE_COMMA_SEPARTED);
    }
  }

  async inputPurchasePrice() {
    const price = await this.readLineAsync(MESSAGE_PURCHASE_PRICE);
    this.validInputNumber(price);
    return parseInt(price, RADIX_INTEGER);
  }

  async inputWinningNumbers() {
    const numbers = await this.readLineAsync(MESSAGE_WINNING_NUMBERS);
    this.validWinningNumberSplitComma(numbers);

    const splitNumbers = numbers.split(',').map((number) => {
      this.validInputNumber(number);
      return parseInt(number, RADIX_INTEGER);
    });
    return splitNumbers;
  }

  async inputBonusNumber() {
    const number = await this.readLineAsync(MESSAGE_BONUS_NUMBER);
    this.validInputNumber(number);
    return parseInt(number, RADIX_INTEGER);
  }

  numberOfDuplicateArrays(lottos, targetValue) {
    return lottos.filter((lotto) => lotto.result === targetValue).length;
  }

  outputPurchasedLottos(lottoResult) {
    console.log('당첨 통계');
    console.log('--------------------');

    console.log(
      `3개 일치 (5,000원) - ${this.numberOfDuplicateArrays(
        lottoResult,
        LOTTO_5TH_PRIZE_WINNER
      )}개`
    );
    console.log(
      `4개 일치 (50,000원) - ${this.numberOfDuplicateArrays(
        lottoResult,
        LOTTO_4TH_PRIZE_WINNER
      )}개`
    );
    console.log(
      `5개 일치 (1,500,000원) - ${this.numberOfDuplicateArrays(
        lottoResult,
        LOTTO_3RD_PRIZE_WINNER
      )}개`
    );
    console.log(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${this.numberOfDuplicateArrays(
        lottoResult,
        LOTTO_SECOND_PRIZE_WINNER
      )}개`
    );
    console.log(
      `6개 일치 (2,000,000,000원) - ${this.numberOfDuplicateArrays(
        lottoResult,
        LOTTO_FIRST_PRIZE_WINNER
      )}개`
    );
  }
}

export default LottoIO;
