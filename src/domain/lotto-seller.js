import { LottoType } from "./lotto-type";
import { LottoOperator } from "./lotto-operator";

export class LottoSeller {

    constructor(lottoOperator) {
        this.lottoOperator = lottoOperator;
    }

    Sell(lottoType, money) {
        let lottoPrice;
        if (lottoType === LottoType.SIMPLE) {
            lottoPrice = 1000;
        } else {
            throw new Error('존재하지 않는 복권입니다.');
        }

        const toBuyCount = money / lottoPrice;

        return this.lottoOperator.Publish(lottoType, toBuyCount);
    }
}
