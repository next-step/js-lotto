export class Lotto {
    #lottoCompany
    #lottoCustomer
    #lottoNumbers
    #winningRank

    constructor(lottoCompany, lottoCustomer, lottoNumbers) {
        this.#lottoCompany = lottoCompany;
        this.#lottoCustomer = lottoCustomer;
        this.#lottoNumbers = lottoNumbers;
        this.#winningRank = 0;
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

    get winningRank() {
        return this.#winningRank;
    }

    setWinningRank(winningRank) {
        this.#winningRank = winningRank;
    }
}