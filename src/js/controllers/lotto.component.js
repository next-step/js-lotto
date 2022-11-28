import { $issued, $stats, $purchased } from "../views/selector.js";
import { PRICE_PER_UNIT, SectionType } from "../utils/const.js";

import { LottoModel } from "../models/lotto.model.js";

import { Component } from "./component.js";
import { StatsComponent } from "./stats.component.js";

export class LottoComponent extends Component {
    #isInputChange;

    constructor(container) {
        super(container);
        this.init();
    }

    init() {
        super.init();
        this._view.displayNone([$stats.lotto]);
        this._view.renderCheckedButton($issued.numberToggleButton, false);
        this.isShowNumbers = false;
    }

    _setEventListeners() {
        $purchased.button.addEventListener('click', () => this.#purchase());
        $purchased.amount.addEventListener('keyup', e => this.#purchaseByEnterKey(e));
        $issued.numberToggleButton.addEventListener('click', () => this.#toggleLottoNumbers());
    }

    _setEventHandler() {
        $purchased.amount.onchange = () => this.#isInputChange = true;
    }

    #purchase() {
        if (!this.#isInputChange) return;
        if (this.#isInputChange) this.reset();
        if (!this._validator.validate(SectionType.Purchase, $purchased.amount.value)) {
            this._view.displayNone([$purchased.lotto]);
            return this.reset();
        }

        this._stateModel.setState({ price: $purchased.amount.value });
        const units = $purchased.amount.value / PRICE_PER_UNIT;
        this._view.displayBlock([$purchased.lotto]);
        const statsComponent = new StatsComponent(this._view, this._stateModel);
        this._view.renderToReplaceInnerHTML($purchased.total, `총 ${units}개를 구매하였습니다.`);
        this.issueLotto(units);
        this.#isInputChange = false;
    }

    #purchaseByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this.#purchase();
    }

    issueLotto(units) {
        const lottoModel = new LottoModel(units);
        this._stateModel.setState({ numberSet: lottoModel.numberSet });
        lottoModel.numberSet.forEach(unit => {
            this._view.renderToAddInnerHTML(
                $issued.tickets,
                `<li class="mx-1 text-4xl">
                    <span>🎟️ </span>
                    <span class="lotto-numbers text-3xl">${unit}</span>
                   </li>`
            );
        })
        this.#showLottoNumbers();
    }

    reset() {
        this._stateModel.reset();
        this._view.displayNone([$stats.lotto]);
        this._view.renderCheckedButton($issued.numberToggleButton, false);
        this.isShowNumbers = false;
        this._view.removeChildNodes($issued.tickets);
    }

    #toggleLottoNumbers() {
        this.isShowNumbers = !this.isShowNumbers;
        const $lottoNumbers = document.querySelectorAll('.lotto-numbers');
        if ($lottoNumbers.length !== 0) this.#showLottoNumbers();
    }

    #showLottoNumbers() {
        const $lottoNumbers = document.querySelectorAll('.lotto-numbers');
        if (!$lottoNumbers) return;
        this.isShowNumbers ? this._view.displayInline($lottoNumbers) : this._view.displayNone($lottoNumbers);
    }
}