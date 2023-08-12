export class LottoSeller{
    #lottoCompany;
    constructor() {}

    joinLottoCompany(lottoCompany) {
        this.#lottoCompany = lottoCompany;
        lottoCompany.addSeller(this);
    }

    askLottoPrice() {
        return this.#lottoCompany.lottoPrice;
    }

    requestLotto(lottoCustomer, lottoAmount) {
        return this.#lottoCompany.issueLotto(lottoCustomer, lottoAmount);
    }
}