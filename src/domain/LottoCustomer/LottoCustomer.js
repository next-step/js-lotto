export class LottoCustomer {
    #lottoList = [];
    constructor() {}

    get lottoList() {
        return this.#lottoList;
    }

    buyLotto(lottoSeller, money) {
        const lottoAmount = lottoSeller.calculateLottoAmount(money);
        this.#lottoList = [...this.#lottoList, ...lottoSeller.requestLotto(this, lottoAmount)];
    }
}