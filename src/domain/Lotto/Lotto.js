export class Lotto {
    #lottoCompany
    #lottoCustomer
    #lottoNumbers

    constructor(lottoCompany, lottoCustomer, lottoNumbers) {
        this.#lottoCompany = lottoCompany;
        this.#lottoCustomer = lottoCustomer;
        this.#lottoNumbers = lottoNumbers;
    }
}