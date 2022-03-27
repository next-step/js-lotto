import { MESSAGE } from "../constant/index.js";
import { LottoMachine } from "./LottoMachine.js";

const LOTTO_UNIT = 1000;
const MIN_PURCHASE_PRICE = 1000;
const MAX_PURCHASE_PRICE = 100000;

export class LottoPurchase {
    purchasePrice = 0;
    lottoMachine = null;
    amount = 0;

    constructor() {
        this.lottoMachine = new LottoMachine();
    }

    purchase(purchasePrice) {
        const resultValue = this.#getPurchasePriceState(purchasePrice);

        if(resultValue.isComplete) {
            this.amount = purchasePrice / LOTTO_UNIT;

            return;
        } 

        alert(resultValue.message);
    }

    getAmount() {
        return this.amount;
    }

    #getPurchasePriceState(price) {
        let resultValue = { isComplete: true, message: "" };

        if (price < MIN_PURCHASE_PRICE) {
            resultValue.isComplete = false;
            resultValue.message = MESSAGE.ERROR.MIN_PURCHASE;

            return resultValue;
        } else if (price % LOTTO_UNIT > 0) {
            resultValue.isComplete = false;
            resultValue.message = MESSAGE.ERROR.UNIT_MISMATCH;

            return resultValue;
        } else if (price > MAX_PURCHASE_PRICE) {
            resultValue.isComplete = false;
            resultValue.message = MESSAGE.ERROR.MAX_PURCHASE;

            return resultValue;
        }

        return resultValue;
    }
}