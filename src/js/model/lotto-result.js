export default class LottoResult {
  #rankObj;

  constructor(result) {
    this.#rankObj = result;
  }

  // (오르거나 떨어진 현재 주식 가격 / 내가 매수한 주식 가격) * 100 - 100
  calcRateOfReturn() {
    return 0;
  }
}
