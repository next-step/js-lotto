import { $stats } from "../views/selector.js";
import { SectionType } from "../utils/const.js";

import { Validator } from "./validator.js";

import { Component } from "./component.js";
import { ModalComponent } from "./modal.component.js";

export class StatsComponent extends Component {
    validator;
    lastNumbers;
    // TODO: input 숫자 두자리 입력 후 auto next focus

    constructor(view, state) {
        super(view, state);
        this.lastNumbers = [];
        this.validator = new Validator();
        this.init();
    }

    init() {
        super.init();
        this._view.displayBlock([$stats.lotto]);
    }

    _setEventListeners() {
        $stats.openModalButton.addEventListener('click', () => this.#validate());
    }

    #validate() {
        this.lastNumbers = [...$stats.lastNumbers].map(row => row.value);
        this.lastNumbers.push($stats.lastBonusNumbers.value);

        if (!this.validator.validate(SectionType.Stats, this.lastNumbers.filter(x => !!x))) return this.reset();
        this.#openStatsModal();
    }

    reset() {
        [...$stats.lastNumbers].forEach(row => this._view.renderInputValue(row));
        this._view.renderInputValue($stats.lastBonusNumbers);
    }

    #openStatsModal() {
        this._stateModel.setState({ lastNumbers: this.lastNumbers.map(row => +row) });
        const modalComponent = new ModalComponent(this._view, this._stateModel);
    }
}