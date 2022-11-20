import { PRICE_PER_UNIT } from "../utils/const.js";
import { Issue } from "./issue.js";
import { displayBlock } from "../utils/util.js";
import { Validator } from "../utils/validator.js";

export class Purchasing {
    $purchased;
    isSubmitAvailable;
    issue;
    validator;

    constructor() {
        this.$purchased = {
            lotto: document.querySelector('.purchased-lotto'),
            amount: document.getElementById('purchase-amount'),
            total: document.querySelector('.purchased-lotto-total'),
            button: document.querySelector('.purchase-button')
        }

        this.isSubmitAvailable = false;
        this.$purchased.button.addEventListener('click', () => this.purchase());
        this.$purchased.amount.addEventListener('keyup', e => this.#purchaseByEnterKey(e));
        this.$purchased.amount.onchange = () => this.isSubmitAvailable = true;
        this.issue = new Issue();
        this.validator = new Validator();
    }

    purchase() {
        if (!this.isSubmitAvailable) return;
        if (this.isSubmitAvailable) this.issue.reset();
        if (!this.validator.validate(this.$purchased.amount.value)) return this.issue.reset();

        const ticketsPurchased = this.$purchased.amount.value / PRICE_PER_UNIT;
        this.#doPurchase(ticketsPurchased);
        this.isSubmitAvailable = false;
    }

    #purchaseByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this.purchase();
    }

    #doPurchase(units) {
        displayBlock(this.$purchased.lotto);
        this.$purchased.total.innerHTML = `총 ${units}개를 구매하였습니다.`;
        this.issue.issueLotto(units);
    }
}