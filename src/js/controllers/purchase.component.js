import { Component } from "./component.js";
import { $lottoManuel, $purchased, $purchasedManuel, $stats } from "../views/selector.js";
import { ACTIONTYPE, LOTTO_MANUEL_INPUT_MIN, PRICE_PER_UNIT, SECTIONTYPE } from "../utils/const.js";
import { stringParserToHTML } from "../utils/util.js";
import { issueComponent } from './issueComponent.js';

export class purchaseComponent extends Component {
    #isInputChange;
    numberSetManuel;

    constructor(container) {
        super(container);
        this.init();
    }

    init() {
        super.init();
        this._view.displayNone([$purchasedManuel.lotto, $stats.lotto, $purchased.lotto]);
    }

    _setEventListeners() {
        $purchased.button.addEventListener('click', () => this.renderManuelLotto());
        $purchased.amount.addEventListener('keyup', e => this._submitByEnterKey(e));
        $purchasedManuel.numbers.forEach(($number, i) => {
            $number.addEventListener('keyup', () => this.#setAutoFocus());
        });
        $purchasedManuel.addButton.addEventListener('click', () => this.#renderToAddInput());
        $purchasedManuel.deleteButton.addEventListener('click', () => this.#renderToDeleteInput());
        $purchasedManuel.button.addEventListener('click', () => this.purchase());
    }

    _setEventHandler() {
        $purchased.amount.onchange = () => this.#isInputChange = true;
    }

    _subscribe() {
        this._stateModel.register({ restart: () => this._restart() });
        this._stateModel.register({ reset: () => this._reset() });
    }

    _initElement() {
        this.#isInputChange = false;
        this.numberSetManuel = [];
        this._view.renderInputValue($purchased.amount);
    }

    _restart() {
        super._restart();
        this._reset();
        this._stateModel.init();
    }

    _reset() {
        this._view.displayNone([$purchasedManuel.lotto, $stats.lotto]);
        [...$purchasedManuel.numbers].forEach($number => this._view.renderInputValue($number));
        this.#removeNumbersValue();
    }

    _submitByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this.renderManuelLotto();
    }

    renderManuelLotto() {
        if (!this.#isInputChange) return;
        if (this.#isInputChange) this._stateModel.setState({ reset: true });

        const params = {
            sectionType: SECTIONTYPE.PURCHASE,
            value: $purchased.amount.value
        }
        if (!this._validator.validate(params)) return;

        this._stateModel.setState({
            price: $purchased.amount.value,
            purchasedUnit: $purchased.amount.value / PRICE_PER_UNIT
        });
        this._view.displayBlock([$purchasedManuel.lotto]);
        this.#isInputChange = false;
    }

    purchase() {
        if (!this.#isValidated()) return this.#removeNumbersValue();
        const issue = new issueComponent({
            view: this._view,
            state: this._stateModel,
            validator: this._validator
        });
    }

    #renderToAddInput() {
        const params = {
            sectionType: SECTIONTYPE.MANUEL_INPUT,
            actionType: ACTIONTYPE.ADD,
            length: $purchasedManuel.set.children.length,
            unit: $purchased.amount.value / PRICE_PER_UNIT
        }
        if (!this._validator.validate(params)) return this.#renderToDeleteInput();
        this._view.renderToAppend($purchasedManuel.set, stringParserToHTML($lottoManuel));
        $purchasedManuel.inputs = this._view.renderToUpdateSelector(
            $purchasedManuel.inputs,
            '.purchased-lotto-manuel-inputs',
            true);
    }

    #renderToDeleteInput() {
        const params = {
            sectionType: SECTIONTYPE.MANUEL_INPUT,
            actionType: ACTIONTYPE.DELETE,
            length: $purchasedManuel.set.children.length,
            unit: LOTTO_MANUEL_INPUT_MIN
        }
        if (!this._validator.validate(params)) return;
        const $lastLottoElement = $purchasedManuel.set.childNodes[$purchasedManuel.set.children.length - 1];
        this._view.remove($lastLottoElement);
    }

    #setAutoFocus() {
        const elements = [...$purchasedManuel.numbers];
        elements.forEach(($number, i) => {
            if (i === elements.length - 1) return;
            if ($number.value.length === $number.maxLength) this._view.renderToSetFocus(elements[i + 1])
        })
    }

    #isValidated = () => {
        this.numberSetManuel = this.#getNumberSetManuel();
        if (!this.#hasNumberSetManuel()) return true;
        this._stateModel.setState({ numberSetManuel: this.numberSetManuel });

        const params = {
            sectionType: SECTIONTYPE.NUMBERS,
            value: null,
            includeBonus: false,
        }

        return this.numberSetManuel
            .reduce((isValidated, set) => {
                params.value = set
                return this._validator.validate(params);
            }, true);
    }

    #removeNumbersValue = () => {
        [...$purchasedManuel.inputs]
            .forEach(input => [...input.children]
                .forEach(num => this._view.renderInputValue(num)));
    }

    #getNumberSetManuel = () => {
        return [...$purchasedManuel.inputs]
            .map(input => [...input.children].map(num => +num.value))
            .map(set => set.filter(num => !!num));
    }

    #hasNumberSetManuel = () => this.numberSetManuel.some(set => set.length > 0);
}