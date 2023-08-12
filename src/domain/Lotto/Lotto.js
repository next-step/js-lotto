export class Lotto {
    #lottoCompany
    #lottoCustomer
    #lottoNumbers

    constructor(lottoCompany, lottoCustomer, lottoNumbers) {
        this.#lottoCompany = lottoCompany;
        this.#lottoCustomer = lottoCustomer;
        this.#lottoNumbers = lottoNumbers;
    }

    get lottoCompany() {
        return this.#lottoCompany;
    }

    get lottoCustomer() {
        return this.#lottoCustomer;
    }

    get lottoNumbers() {
        return this.#lottoNumbers;
    }
}