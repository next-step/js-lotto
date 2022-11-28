import { $stats } from "../views/selector.js";
import { SECTIONTYPE } from "../utils/const.js";

import { Component } from "./component.js";
import { ModalComponent } from "./modal.component.js";

export class StatsComponent extends Component {
    lastNumbers;
    lastBonusNumber;

    constructor(container) {
        super(container);
        this.lastNumbers = [];
        this.lastBonusNumber = 0;
        this.init();
    }

    init() {
        super.init();
        this._view.displayBlock([$stats.lotto]);
    }

    _setEventListeners() {
        $stats.openModalButton.addEventListener('click', () => this.#validate());
        $stats.lastNumbers.forEach(($lastNumber, i) => {
            $lastNumber.addEventListener('keyup', () => this.this.#setAutoFocus());
        });
    }

    reset() {
        [...$stats.lastNumbers].forEach(row => this._view.renderInputValue(row));
        this._view.renderInputValue($stats.lastBonusNumbers);
    }

    #setAutoFocus() {
        [...$stats.lastNumbers].forEach(($lastNumber, i) => {
            if ($lastNumber.value.length === $lastNumber.maxLength) {
                [...$stats.lastNumbers][i + 1].focus();
            }
        })
    }

    #validate() {
        this.lastNumbers = [...$stats.lastNumbers].map(row => row.value);
        this.lastBonusNumber = $stats.lastBonusNumbers.value;

        if (!this.#isValidated()) return this.reset();
        this.#openStatsModal();
    }

    #isValidated = () => {
        return this._validator
            .validate(SECTIONTYPE.STATS, [...this.lastNumbers, this.lastBonusNumber]
                .filter(x => !!x));
    }

    #openStatsModal() {
        this._stateModel.setState(
            {
                lastNumbers: this.lastNumbers.map(row => +row),
                lastBonusNumber: +this.lastBonusNumber
            });
        const modalComponent = new ModalComponent({
            view: this._view,
            state: this._stateModel,
            validator: this._validator
        });
    }
}