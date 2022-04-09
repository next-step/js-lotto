import LottoPurchaseUnitException from "../exceptions/LottoPurchseUnitException.js";

export default class LottoPurchase {
    #purchasePrice;

    static LOTTO_UNIT = 1_000;
    static MIN_PURCHASE_PRICE = 1_000;
    static MAX_PURCHASE_PRICE = 100_000;

    constructor(price) {
        if (this.validation(price)) {
            this.#purchasePrice = price;
        }
    }

    get purchasePrice() {
        return this.#purchasePrice;
    }

    set purchasePrice(price) {
        this.#purchasePrice = price;
    }

    validation(price) {
        if (price % LottoPurchase.LOTTO_UNIT !== 0) {
            throw new LottoPurchaseUnitException();
        }
    }
}
