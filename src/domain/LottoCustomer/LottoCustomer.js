export class LottoCustomer {
    #lottoList = [];
    constructor() {}

    get lottoList() {
        return this.#lottoList;
    }

    buyLotto(lottoSeller, money) {
        const lottoAmount = lottoSeller.calculateLottoAmount(money);
        this.addNewLottoList(lottoSeller.requestLotto(this, lottoAmount));
    }

    addNewLottoList(lottoList) {
        this.#lottoList = [...this.#lottoList, ...lottoList];
    }

    getWinnerCount(winningRank) {
        return this.#lottoList.filter(lotto => lotto.winningRank === winningRank).length;
    }

    getProfitRate() {
        const totalInput = this.#lottoList.reduce((acc, lotto) => acc + lotto.lottoCompany.lottoPrice, 0);
        const totalPrize = this.#lottoList.reduce((acc, lotto) => acc + lotto.lottoCompany.getPrize(lotto.winningRank), 0);
        return totalPrize / totalInput * 100;
    }
}