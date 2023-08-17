export class LottoSeller{
    #lottoCompany;
    constructor() {}

    joinLottoCompany(lottoCompany) {
        this.#lottoCompany = lottoCompany;
        lottoCompany.addSeller(this);
    }

    calculateLottoAmount(money) {
        return Math.floor(money / this.#lottoCompany.lottoPrice);
    }

    requestLotto(lottoCustomer, lottoAmount) {
        const lottoList = this.#lottoCompany.makeLottoList(lottoCustomer, lottoAmount);
        this.#lottoCompany.storeLottoList(lottoList);
        return lottoList;
    }
}