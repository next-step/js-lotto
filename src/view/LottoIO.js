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

  async inputPurchasePrice() {
    return await this.readLineAsync(MESSAGE_PURCHASE_PRICE);
  }
}

export default LottoIO;
