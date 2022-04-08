import { LottoPurchase } from "../domain/LottoPurchase.js";

export class LottoPurchaseForm {
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
        try {
            this.onPurchase(this.purchasePriceInput.value);
        } catch (error) {
            alert(error.message);
        }
    }
}

// const ENTER = "Enter";

// export class LottoPurchaseForm {
//     static lottoPurchase;
//     onLottoPurchase;

//     $element;
//     $purchasePriceInput;
//     $purchaseButton;

//     constructor(lottoPurchase, props) {
//         this.$element = document.querySelector("#lotto-purchase-area");
//         this.onLottoPurchase = props.onLottoPurchase;
//         this.lottoPurchase = lottoPurchase;

//         this.#render();
//         this.#mounted();
//         this.#setEvent();
//     }

//     #render() {
//         this.$element.innerHTML = this.#getTemplate();
//     }

//     #mounted() {
//         this.$purchasePriceInput = document.querySelector("#purchase-price-input");
//         this.$purchaseButton = document.querySelector("#purchase-button");
//     }

//     #getTemplate() {
//         return `
//         <form class="mt-5" onsubmit="return false">
//             <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요. </label>
//             <div class="d-flex">
//                 <input
//                     type="number"
//                     id="purchase-price-input"
//                     class="w-100 mr-2 pl-2"
//                     data-test="purchase-price-input"
//                     placeholder="구입 금액"
//                     min="1000"
//                     max="1000000"
//                 />
//                 <button type="button" data-test="purchase-button" id="purchase-button" class="btn btn-cyan">확인</button>
//             </div>
//         </form>`;
//     }

//     #setEvent() {
//         this.$purchasePriceInput.addEventListener("keyup", (event) =>
//             this.#onPriceInputKeyup(event)
//         );
//         this.$purchaseButton.addEventListener("click", () => this.#onPurchaseClick());
//     }

//     #onPriceInputKeyup(event) {
//         event.preventDefault();
//         if (event.key === ENTER) {
//             this.#onPurchase();
//         }
//     }

//     #onPurchaseClick() {
//         this.#onPurchase();
//     }

//     #onPurchase() {
//         const purchasePriceInput = this.$purchasePriceInput.value;

//         this.lottoPurchase.purchasePrice = purchasePriceInput;
//         this.lottoPurchase.purchase(purchasePriceInput);

//         if (this.lottoPurchase.amount > 0) {
//             this.onLottoPurchase();
//         }
//     }

//     error(message) {
//         alert(message);
//     }
// }
