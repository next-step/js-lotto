import { ERROR, pricePerUnit } from "../utils/const.js";
import { Issue } from "./issue.js";
import { displayBlock, displayNone } from "../utils/util.js";

export class Purchase {
    $purchased;
    hasOnChange;
    issue;

    constructor() {
        this.$purchased = {
            lotto: document.querySelector('.purchased-lotto'),
            amount: document.getElementById('form-amount'),
            total: document.querySelector('.purchased-lotto-total'),
            button: document.querySelector('.purchase-button')
        }

        this.hasOnChange = false;
        this.$purchased.button.addEventListener('click', () => this.purchase());
        this.$purchased.amount.onchange = () => this.onChange();
        this.issue = new Issue();
    }

    onChange() {
        this.hasOnChange = true;
    }

    purchase() {
        if (!this.hasOnChange) return;
        if (!!this.hasOnChange) this.issue.reset();

        if (!this.$purchased.amount.value) alert(ERROR.InputRequired);

        const isCommensurable = this.$purchased.amount.value % pricePerUnit;
        const lottoNumber = this.$purchased.amount.value / pricePerUnit;

        !isCommensurable ? this.doPurchase(lottoNumber) : this.rejectPurchase();
        this.hasOnChange = false;
    }

    doPurchase(units) {
        displayBlock(this.$purchased.lotto);
        this.$purchased.total.innerHTML = `총 ${units}개를 구매하였습니다.`;
        this.issue.issueLotto(units);
    }

    rejectPurchase() {
        displayNone(this.$purchased.lotto);
        alert(ERROR.IncorrectUnit);
    }
}