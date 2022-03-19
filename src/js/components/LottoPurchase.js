import { $ } from "../utils/selector.js";
import {
    LOTTO_MAX_NUMBER,
    LOTTO_MIN_NUMBER,
    LOTTO_TICKET_LENGTH,
    LOTTO_UNIT,
    MAX_PURCHASE_PRICE,
    MESSAGE,
    MIN_PURCHASE_PRICE,
    SELECTOR,
} from "../constant/index.js";

export class LottoPurchase {
    constructor($element, { onLottoPurchase }) {
        this.$element = $element;
        this.onLottoPurchase = onLottoPurchase;

        this.render();
        this.mounted();
        this.setEvent();
    }

    render() {
        this.$element.innerHTML = this.getTemplate();
    }

    mounted() {
        this.$purchasePriceInput = $(SELECTOR.ID.PURCHASE_PRICE_INPUT);
    }

    getTemplate() {
        return `
        <form class="mt-5">
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

    setEvent() {
        $(SELECTOR.ID.PURCHASE_BUTTON).addEventListener("click", (event) => this.onPurchaseClick());
    }

    onPurchaseClick() {
        const purchasePriceInput = this.$purchasePriceInput.value;

        if(this.checkPurchasePrice(purchasePriceInput)) {
            this.onLottoPurchase(this.getLottoList(purchasePriceInput));
        }        
    }

    getLottoList(purchasePriceInput) {
        return this.getLottoTickets(this.getLottoAmount(purchasePriceInput));
    }

    getLottoAmount(price) {
        return price / LOTTO_UNIT;
    }

    getLottoTickets(amount) {
        let lottoTickets = [];

        for (let i = 0; i < amount; i++) {
            lottoTickets.push(this.getLottoTicket());
        }

        return lottoTickets;
    }

    getLottoTicket() {
        let numObj = {};
        let count = 0;
        let randomNumber = 0;

        while (count < LOTTO_TICKET_LENGTH) {
            randomNumber = this.getRandomNumber();
            if (!numObj[randomNumber]) {
                count++;
                numObj[randomNumber] = randomNumber;
            }
        }

        return Object.keys(numObj);
    }

    getRandomNumber() {
        return Math.trunc(
            Math.random() * (LOTTO_MAX_NUMBER - LOTTO_MIN_NUMBER + 1) + LOTTO_MIN_NUMBER
        );
    }

    checkPurchasePrice(price) {
        if (price < MIN_PURCHASE_PRICE) {
            alert(MESSAGE.ERROR.MIN_PURCHASE);
            return false;
        } else if (price % LOTTO_UNIT > 0) {
            alert(MESSAGE.ERROR.UNIT_MISMATCH);
            return false;
        } else if (price > MAX_PURCHASE_PRICE) {
            alert(MESSAGE.ERROR.MAX_PURCHASE);
            return false;
        }

        return true;
    }
}
