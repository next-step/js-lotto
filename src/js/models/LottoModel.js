export default class LottoModel {
  constructor() {
    this._lottos = null;
  }

  get lottos() {
    return this._lottos;
  }

  set lottos(money) {
    this._lottos = money;
    console.log(money);
  }
}
