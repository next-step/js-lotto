import { $stats } from "../views/selector.js";
import { SECTIONTYPE } from "../utils/const.js";

import { Component } from "./component.js";
import { ModalComponent } from "./modal.component.js";

export class StatsComponent extends Component {
    lastNumbers;

    constructor(container) {
        super(container);
        this.lastNumbers = [];
        this.init();
    }

    init() {
        super.init();
        this._view.displayBlock([$stats.lotto]);
    }

    _setEventListeners() {
        $stats.openModalButton.addEventListener('click', () => this.#validate());
    }

    reset() {
        [...$stats.lastNumbers].forEach(row => this._view.renderInputValue(row));
        this._view.renderInputValue($stats.lastBonusNumbers);
    }

    #validate() {
        this.lastNumbers = [...$stats.lastNumbers].map(row => row.value);
        this.lastNumbers.push($stats.lastBonusNumbers.value);

        if (!this._validator.validate(SECTIONTYPE.STATS, this.lastNumbers.filter(x => !!x))) return this.reset();
        this.#openStatsModal();
    }

    #openStatsModal() {
        this._stateModel.setState({ lastNumbers: this.lastNumbers.map(row => +row) });
        const modalComponent = new ModalComponent(this._view, this._stateModel);
    }
}