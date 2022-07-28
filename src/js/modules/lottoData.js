import { ERROR } from '../consts.js';

class LottoData {
  setInputMoney(inputMoney) {
    this.inputMoney = inputMoney;
  }
  getInputMoney() {
    return this.inputMoney;
  }
  getBoughtResult() {
    if (!this.boughtResult) throw new Error(ERROR.NO_BOUGHT_DATA);
    return this.boughtResult;
  }
  setBoughtResult(result) {
    this.boughtResult = result;
  }
}

export { LottoData };
