export default class LottoPurchaseForm {
    lottoPurchase;

    constructor(props) {
        this.onPurchase = props.onPurchase;
        this.$element = document.querySelector("#lotto-purchase-area");
        this.#render();
        this.#mounted();
    }

    #render() {
        this.$element.innerHTML = this.#getTemplate();
    }

    #mounted() {
        this.purchasePriceInput = document.querySelector("#purchase-price-input");
        this.purchasePriceSubmit = document.querySelector("#purchase-price-submit");

        this.purchasePriceInput.addEventListener("keyup", (event) =>
            this.#onPurchaseInputKeyup(event)
        );
        this.purchasePriceSubmit.addEventListener("click", () => this.#onPurchaseSubmitClick());
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
                <button type="button" data-test="purchase-button" id="purchase-price-submit" class="btn btn-cyan">확인</button>
            </div>
        </form>`;
    }

    #onPurchaseInputKeyup(event) {
        if (event.key === "Enter") {
            this.#onSubmit();
        }
    }

    #onPurchaseSubmitClick() {
        this.#onSubmit();
    }

    #onSubmit() {
        this.onPurchase(this.purchasePriceInput.value);
    }
}
