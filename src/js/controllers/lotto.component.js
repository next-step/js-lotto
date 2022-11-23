import { $issued, $stats, $purchased } from "../views/selector.js";
import { PRICE_PER_UNIT } from "../utils/const.js";
import { Validator } from "./validator.js";
import { LottoModel } from "../models/lotto.model.js";

export class LottoComponent {
    #view;
    #stateModel;
    #isInputChange;
    validator;

    constructor(view, state) {
        this.#view = view;
        this.#stateModel = state;
        this.validator = new Validator();
        this.init();
    }

    init() {
        this.#setEventListeners();
        this.#setEventHandler();
        this.subscribe();
        this.#view.displayNone([$stats.lotto]);
        this.#view.renderCheckedButton($issued.numberToggleButton, false);
        this.isShowNumbers = false;
    }

    #setEventListeners() {
        $purchased.button.addEventListener('click', () => this.#purchase());
        $purchased.amount.addEventListener('keyup', e => this.#purchaseByEnterKey(e));
        $issued.numberToggleButton.addEventListener('click', () => this.#toggleLottoNumbers());
    }

    #setEventHandler() {
        $purchased.amount.onchange = () => this.#isInputChange = true;
    }

    subscribe() {
        this.#stateModel.register(() => $issued.numberToggleButton.checked = this.isShowNumbers);
    }

    #purchase() {
        if (!this.#isInputChange) return;
        if (this.#isInputChange) this.reset();
        if (!this.validator.validate($purchased.amount.value)) {
            this.#view.displayNone([$purchased.lotto]);
            return this.reset();
        }

        const units = $purchased.amount.value / PRICE_PER_UNIT;
        this.#view.displayBlock([$purchased.lotto, $stats.lotto]);
        this.#view.renderToReplaceInnerHTML($purchased.total, `총 ${units}개를 구매하였습니다.`);
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
        this.#stateModel.setState({ numberSet: lottoModel.numberSet });
        lottoModel.numberSet.forEach(unit => {
            this.#view.renderToAddInnerHTML(
                $issued.tickets,
            `<li class="mx-1 text-4xl">
                    <span>🎟️ </span>
                    <span class="lotto-numbers text-3xl">${ unit }</span>
                   </li>`
            );
        })
        this.#showLottoNumbers();
    }

    reset() {
        this.#stateModel.reset();
        this.#view.displayNone([$stats.lotto]);
        this.#view.renderCheckedButton($issued.numberToggleButton, false);
        this.isShowNumbers = false;
        this.#view.removeChildNodes($issued.tickets);
    }

    #toggleLottoNumbers() {
        this.isShowNumbers = !this.isShowNumbers;
        this.#stateModel.setState({ isShowNumbers: this.isShowNumbers });
        const $lottoNumbers = document.querySelectorAll('.lotto-numbers');
        if ($lottoNumbers.length !== 0) this.#showLottoNumbers();
    }

    #showLottoNumbers() {
        const $lottoNumbers = document.querySelectorAll('.lotto-numbers');
        if (!$lottoNumbers) return;
        this.isShowNumbers ? this.#view.displayInline($lottoNumbers) : this.#view.displayNone($lottoNumbers);
    }
}