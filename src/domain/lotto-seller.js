export class LottoSeller {

    constructor(lottoOperator) {
        this.lottoOperator = lottoOperator;
    }

    sell(money) {
        const lottoPrice = 1000;
        const toBuyCount = money / lottoPrice;
        return this.lottoOperator.publish(toBuyCount);
    }
}
