import { Component } from "./component.js";
import { StatsComponent } from "./stats.component.js";
import { LottoModel } from "../models/lotto.model.js";
import { $issued, $purchased } from "../views/selector.js";

export class IssueComponent extends Component {
    #purchasedUnit;
    #numberSetManuel;
    #numberSetAuto;

    constructor(container) {
        super(container);
        this.init();
        this.#issue();
    }

    init() {
        super.init();
        this.#purchasedUnit = this._stateModel.purchasedState.purchasedUnit ?? 0;
        this.#numberSetManuel = this._stateModel.numbersState.numberSetManuel ?? [];
    }

    _setEventListeners() {
        $issued.numberToggleButton.addEventListener('click', () => this.#toggleLottoNumbers());
    }

    _subscribe() {
        this._stateModel.register({ restart: () => this._restart() });
        this._stateModel.register({ reset: () => this._reset() });
    }

    _initElement() {
        this.#numberSetAuto = [];
        this.isShowNumbers = false;
    }

    _restart() {
        super._restart();
        this._reset();
        this._stateModel.reset();
    }

    _reset() {
        this.#numberSetAuto = this.#numberSetManuel = [];
        this._view.checkButton($issued.numberToggleButton, false);
        this._view.removeChildNodes($issued.tickets);
        this._view.displayNone([$purchased.lotto]);
        this._stateModel.resetState();
    }

    _submitByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this.#issue()
    }

    #issue() {
        this._view.displayBlock([$purchased.lotto]);

        new StatsComponent({
            view: this._view,
            state: this._stateModel,
            validator: this._validator
        });
        this._view.replaceInnerHTML($purchased.total, `총 ${this.#purchasedUnit}개를 구매하였습니다.`);
        this.#issueLotto();
    }

    #issueLotto() {
        const numberSet = this.#getNumberSet();
        this._stateModel.setNumbersState('numberSet', numberSet);
        this.#renderNumberSet(numberSet)
        this.#showLottoNumbers();
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

    #getNumberSet = () => {
        const purchasedUnitLeft = this.#purchasedUnit - this.#numberSetManuel?.length;

        if (purchasedUnitLeft > 0) {
            this.#numberSetAuto = new LottoModel(purchasedUnitLeft).numberSet;
        }
        return [...this.#numberSetManuel, ...this.#numberSetAuto];
    }

    #renderNumberSet(numberSet) {
        numberSet.forEach(unit => {
            this._view.addInnerHTML(
                $issued.tickets,
                `<li class="mx-1 text-4xl">
                    <span>🎟️ </span>
                    <span class="lotto-numbers text-3xl">${unit}</span>
                   </li>`
            );
        });
    }
}