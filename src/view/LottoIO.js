export const ERROR_MESSAGE_INPUT_PURCHASE_PRICE = '구매 금액은 숫자만 입력 가능합니다.';

const MESSAGE_PURCHASE_PRICE = '구입금액을 입력해 주세요.';

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

  validPurChasePrice(price) {
    if (Number.isNaN(Number(price))) throw new Error(ERROR_MESSAGE_INPUT_PURCHASE_PRICE);
  }

  async inputPurchasePrice() {
    const price = await this.readLineAsync(MESSAGE_PURCHASE_PRICE);
    this.validPurChasePrice(price);
    return parseInt(price);
  }
}

export default LottoIO;
