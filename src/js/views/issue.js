import { arr, displayInline, displayNone, getLottoNumbers } from "../utils/util.js";

export class Issue {
    $issuedTickets;
    $lottoNumbersToggleButton;
    isShowNumber;
    lottoNumbers;

    constructor() {
        this.$issuedTickets = document.querySelector('.lotto-tickets');
        this.$lottoNumbersToggleButton = document.querySelector('.lotto-numbers-toggle-button');
        this.isShowNumber = false;
        this.lottoNumbers = [];

        this.$lottoNumbersToggleButton.addEventListener('click', () => this.toggleButton());
        this.showLottoNumbers();
    }

    reset() {
        this.lottoNumbers = [];
        this.$lottoNumbersToggleButton.checked = false;
        this.isShowNumber = false;
        while (this.$issuedTickets.hasChildNodes()) {
            this.$issuedTickets.removeChild(this.$issuedTickets.firstChild);
        }
    }

    toggleButton() {
        this.isShowNumber = !this.isShowNumber;
        if (!!document.querySelectorAll('.lotto-numbers')) this.showLottoNumbers();
    }

    issueLotto(units) {
        arr(units).forEach(unit => {
            const randomNumbers = getLottoNumbers().join(', ');
            this.creatLottoElement(randomNumbers);
            this.lottoNumbers.push(randomNumbers);
        })
    }

    creatLottoElement (lottoNumber) {
        this.$issuedTickets.innerHTML +=
            `<li class="mx-1 text-4xl">
                <span>🎟️ </span>
                <span class="lotto-numbers text-3xl">${ lottoNumber }</span>
            </li>`;

        this.showLottoNumbers();
    }

    showLottoNumbers() {
        const $lottoNumber = document.querySelectorAll('.lotto-numbers');
        if (!$lottoNumber) return;
        if (!this.isShowNumber) return $lottoNumber.forEach(row => displayNone(row));
        $lottoNumber.forEach(row => displayInline(row));
    }
}