export class LottoSeller {

    constructor(lottoOperator) {
        this.lottoOperator = lottoOperator;
    }

    Sell(money) {
        const lottoPrice = 1000;
        const toBuyCount = money / lottoPrice;
        return this.lottoOperator.Publish(toBuyCount);
    }
}
