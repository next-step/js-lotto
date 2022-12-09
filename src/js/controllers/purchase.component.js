import { Component } from "./component.js";
import { $lottoManuel, $purchased, $purchasedManuel, $stats } from "../views/selector.js";
import { PRICE_PER_UNIT, SECTIONTYPE } from "../utils/const.js";
import { stringParserToHTML } from "../utils/util.js";
import { IssueComponent } from './issueComponent.js';

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
        [...$purchasedManuel.numbers].forEach($number => {
            $number.addEventListener('keyup', e => this.#setAutoFocus(e));
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
        this._stateModel.reset();
    }

    _reset() {
        this._view.displayNone([$purchasedManuel.lotto, $stats.lotto]);
        [...$purchasedManuel.numbers].forEach($number => this._view.renderInputValue($number));
        this.#initNumbersValue();
        this._stateModel.setState('purchased', false);

        this._view.renderDisabledButton([
            $purchasedManuel.button,
            $purchasedManuel.addButton,
            $purchasedManuel.deleteButton
        ], false);

        while ($purchasedManuel.set.children.length > 1) {
            this.#renderToDeleteInput();
        }
    }

    _submitByEnterKey(e) {
        if (e.key !== 'Enter') return;
        e.preventDefault();
        this.renderManuelLotto();
    }

    renderManuelLotto() {
        if (!this.#isInputChange) return;
        this._stateModel.setState('reset', true);

        const params = {
            sectionType: SECTIONTYPE.PURCHASE,
            value: $purchased.amount.value
        }
        if (!this._validator.validate(params)) return;

        this._stateModel.setState('price', $purchased.amount.value);
        this._stateModel.setState('purchasedUnit', $purchased.amount.value / PRICE_PER_UNIT);
        this._view.displayBlock([$purchasedManuel.lotto]);
        this.#isInputChange = false;
        this.#setDisabledDeleteButton();
    }

    purchase() {
        if (this._stateModel.getState('purchased') || !this.#isValidated()) return;

        this._stateModel.setState('purchased', true);
        if (this.#hasNumberSetManuel()) {
            this._stateModel.setState('numberSetManuel', this.numberSetManuel);
        }

        this._view.renderDisabledButton([
            $purchasedManuel.button,
            $purchasedManuel.addButton,
            $purchasedManuel.deleteButton
        ], true);

        new IssueComponent({
            view: this._view,
            state: this._stateModel,
            validator: this._validator
        });
    }

    #renderToAddInput() {
        const params = {
            sectionType: SECTIONTYPE.MANUEL_INPUT,
            length: $purchasedManuel.set.children.length,
            unit: $purchased.amount.value / PRICE_PER_UNIT
        }
        if (!this._validator.validate(params)) return this.#renderToDeleteInput();
        this._view.renderToAppend($purchasedManuel.set, stringParserToHTML($lottoManuel));
        this.#setDisabledDeleteButton();
        $purchasedManuel.inputs = this._view.renderToUpdateSelector({
            selector: $purchasedManuel.inputs,
            className: '.purchased-lotto-manuel-inputs',
            isAll: true
        });
    }

    #renderToDeleteInput() {
        const $lastLottoElement = $purchasedManuel.set.childNodes[$purchasedManuel.set.children.length - 1];
        this._view.remove($lastLottoElement);
        this.#setDisabledDeleteButton();
    }

    #setDisabledDeleteButton() {
        if ($purchasedManuel.set.children.length < 2) {
            this._view.renderDisabledButton([$purchasedManuel.deleteButton], true);
            return;
        }

        return this._view.renderDisabledButton([$purchasedManuel.deleteButton], false);
    }

    #setAutoFocus(e) {
        const $InputNextSibling = e.target.nextElementSibling;
        const isValueMaxLength = e.target.maxLength === e.target.value.length;
        if (!!$InputNextSibling && isValueMaxLength) {
            this._view.renderToSetFocus($InputNextSibling);
        }
    }

    #isValidated = () => {
        this.numberSetManuel = this.#getManuelNumber();
        if (!this.#hasNumberSetManuel()) return true;

        const params = {
            sectionType: SECTIONTYPE.MANUEL_NUMBERS,
            value: this.numberSetManuel,
        }
        return this._validator.validate(params);
    }

    #initNumbersValue = () => {
        [...$purchasedManuel.inputs]
            .forEach($input => [...$input.children]
                .forEach($input => this._view.renderInputValue($input)));
    }

    #getManuelNumber = () => {
        return [...$purchasedManuel.inputs]
            .map($input => [...$input.children].map($input => +$input.value))
            .map(set => set.filter(num => !!num));
    }

    #hasNumberSetManuel = () => this.numberSetManuel.some(set => set.length > 0);
}