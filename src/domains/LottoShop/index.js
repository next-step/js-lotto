export class LottoShop {
  static BASE_LOTTO_PRICE = 1_000;

  #lottoMachine;
  #lottoPrice;

  constructor({ lottoMachine, lottoPrice = LottoShop.BASE_LOTTO_PRICE } = {}) {
    this.#lottoMachine = lottoMachine;
    this.#lottoPrice = lottoPrice;
  }

  buyLottos(price) {
    const lottoCount = Math.floor(price / this.#lottoPrice);

    return this.#lottoMachine.issueLottos(lottoCount);
  }
}
