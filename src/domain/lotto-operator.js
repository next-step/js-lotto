import { Lotto } from "./lotto";
import { Factory } from "../factory/factory";

// 로또 사업자
export class LottoOperator {
    #publishedLottos = new Array();
    #winnerLotto;

    constructor() {
    }

    Publish(lottyType, count) {
        const results = Array();
        for (let i = 0; i < count; i++) {
            const lotto = Factory.Create(lottyType);

            this.#publishedLottos.push(lotto);

            results.push(lotto);
        }
        return results;
    }
}
