import { MESSAGE } from "../constant/index.js";
import { LottoNumber } from "./LottoNumber.js";

const LOTTO_MAX_NUMBER = 45;
const LOTTO_UNIT = 1000;
const MIN_PURCHASE_PRICE = 1000;
const MAX_PURCHASE_PRICE = 100000;
const ENTER = "Enter";

export class LottoPurchase {
    lottoNumber = null;
    onLottoPurchase = null;

    $element = null;
    $purchasePriceInput = null;
    $purchaseButton = null;

    constructor($element, props) {
        this.$element = $element;
        this.lottoNumber = new LottoNumber();
        this.onLottoPurchase = props.onLottoPurchase;

        this.#render();
        this.#mounted();
        this.#setEvent();
    }

    #render() {
        this.$element.innerHTML = this.#getTemplate();
    }

    #mounted() {
        this.$purchasePriceInput = document.querySelector("#purchase-price-input");
        this.$purchaseButton = document.querySelector("#purchase-button");
    }

    #getTemplate() {
        return `
        <form class="mt-5" onsubmit="return false">
            <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요. </label>
            <div class="d-flex">
                <input
                    type="number"
                    id="purchase-price-input"
                    class="w-100 mr-2 pl-2"
                    data-test="purchase-price-input"
                    placeholder="구입 금액"
                    min="1000"
                    max="1000000"
                />
                <button type="button" data-test="purchase-button" id="purchase-button" class="btn btn-cyan">확인</button>
            </div>
        </form>`;
    }

    #setEvent() {
        this.$purchasePriceInput.addEventListener("keyup", (event) =>
            this.#onPriceInputKeyup(event)
        );
        this.$purchaseButton.addEventListener("click", (event) => this.#onPurchaseClick());
    }

    #onPriceInputKeyup(event) {
        event.preventDefault();
        if (event.key === ENTER) {
            this.#onPurchase();
        }
    }

    #onPurchaseClick() {
        this.#onPurchase();
    }

    #onPurchase() {
        const purchasePriceInput = this.$purchasePriceInput.value;
        const resultValue = this.#getPurchasePriceState(purchasePriceInput);

        if (resultValue.isComplete) {
            this.onLottoPurchase(this.#getLottoList(purchasePriceInput));
            return;
        }

        alert(resultValue.message);
    }

    #getLottoList(purchasePriceInput) {
        return this.lottoNumber.getLottoNumbers(this.#getLottoAmount(purchasePriceInput));
    }

    #getLottoAmount(price) {
        return price / LOTTO_UNIT;
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
