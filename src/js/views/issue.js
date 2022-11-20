import { arr, displayInline, displayNone } from "../utils/util.js";
import { LottoNumbers } from "./lottoNumbers.js";

export class Issue {
    $issuedTickets;
    $lottoNumbersToggleButton;
    isShowNumbers;
    lottoNumbers;

    constructor() {
        this.$issuedTickets = document.querySelector('.lotto-tickets');
        this.$lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');
        this.isShowNumbers = false;
        this.lottoNumbers = [];
        this.$lottoNumbersToggleButton.addEventListener('click', () => this.#toggleLottoNumbers());
    }

    reset() {
        this.lottoNumbers = [];
        this.$lottoNumbersToggleButton.checked = false;
        this.isShowNumbers = false;
        this.#removeTickets();
    }

    #removeTickets() {
        while (this.$issuedTickets.hasChildNodes()) {
            this.$issuedTickets.removeChild(this.$issuedTickets.firstChild);
        }
    }

    issueLotto(units) {
        arr(units).forEach(_ => {
            const { numbers } = new LottoNumbers();
            this.#creatLottoElement(numbers);
            this.lottoNumbers.push(numbers);
        })
        this.#showLottoNumbers();
    }

    #toggleLottoNumbers() {
        this.isShowNumbers = !this.isShowNumbers;
        if (document.querySelectorAll('.lotto-numbers').length !== 0) this.#showLottoNumbers();
    }

    #creatLottoElement (lottoNumber) {
        this.$issuedTickets.innerHTML +=
            `<li class="mx-1 text-4xl">
                <span>🎟️ </span>
                <span class="lotto-numbers text-3xl">${ lottoNumber }</span>
            </li>`;
    }

    #showLottoNumbers() {
        const $lottoNumber = document.querySelectorAll('.lotto-numbers');
        if (!$lottoNumber) return;
        const displayFn = this.isShowNumbers ? displayInline : displayNone;
        $lottoNumber.forEach(displayFn);
    }
}