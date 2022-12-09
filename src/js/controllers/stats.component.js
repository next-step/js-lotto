import { $purchased, $stats } from "../views/selector.js";
import { SECTIONTYPE } from "../utils/const.js";

import { Component } from "./component.js";
import { ModalComponent } from "./modal.component.js";

export class StatsComponent extends Component {
    lastNumbers;
    lastBonusNumber;

    constructor(container) {
        super(container);
        this.init();
        this._view.displayBlock([$stats.lotto]);
    }

    init() {
        super.init();
        this._view.displayNone([$stats.lotto]);
    }

    _setEventListeners() {
        $stats.openModalButton.addEventListener('click', () => this.#validate());
        [...$stats.lastNumbers].forEach($lastNumber => {
            $lastNumber.addEventListener('keyup', e => this.#setAutoFocus(e))
        });
    }

    _subscribe() {
        this._stateModel.register({ restart: () => this._restart() });
        this._stateModel.register({ reset: () => this._reset() });
    }

    _initElement() {
        this.lastNumbers = [];
        this.lastBonusNumber = 0;
    }

    _restart() {
        super._restart();
        this._reset();
        this._stateModel.reset();
    }

    _reset() {
        this._view.displayNone([$stats.lotto]);
        [...$stats.lastNumbers].forEach(row => this._view.renderInputValue(row));
        this._view.renderInputValue($stats.lastBonusNumbers);
        this._stateModel.resetState();
    }

    #setAutoFocus(e) {
        const $InputNextSibling = e.target.nextElementSibling;
        const $InputNextFocus = !!$InputNextSibling ? $InputNextSibling : $stats.lastBonusNumbers;
        const isValueMaxLength = e.target.maxLength === e.target.value.length;

        if (isValueMaxLength) {
            this._view.renderToSetFocus($InputNextFocus);
        }
    }

    #validate() {
        this.lastNumbers = [...$stats.lastNumbers].map(row => row.value);
        this.lastBonusNumber = $stats.lastBonusNumbers.value;

        if (!this.#isValidated()) return;
        this.#openStatsModal();
    }

    #isValidated = () => {
        const params = {
            sectionType: SECTIONTYPE.STATS_NUMBERS,
            value: [...this.lastNumbers, this.lastBonusNumber].filter(num => !!num)
        }
        return this._validator.validate(params);
    }

    #openStatsModal() {
        this._stateModel.setState('lastNumbers', this.lastNumbers.map(row => +row));
        this._stateModel.setState('lastBonusNumber', +this.lastBonusNumber);
        new ModalComponent({
            view: this._view,
            state: this._stateModel,
            validator: this._validator
        });
    }
}