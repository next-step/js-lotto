import { MESSAGE } from "../constant/index.js";
import { LottoPurchase } from "../domain/LottoPurchase.js";


const ENTER = "Enter";

export class LottoPurchaseForm {
    lottoNumber = null;
    lottoPurchase = null;
    onLottoPurchase = null;

    $element = null;
    $purchasePriceInput = null;
    $purchaseButton = null;

    constructor($element, props) {
        this.$element = $element;
        this.onLottoPurchase = props.onLottoPurchase;
        this.lottoPurchase = new LottoPurchase({

        });

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
        this.lottoPurchase.purchase(purchasePriceInput);
        if(this.lottoPurchase.getAmount() > 0) {
            this.onLottoPurchase(this.lottoPurchase.getAmount());
        }       
    }
}
