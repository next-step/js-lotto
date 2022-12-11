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
        this._view.setInputValue($purchased.amount);
    }

    _restart() {
        super._restart();
        this._reset();
        this._stateModel.reset();
    }

    _reset() {
        this._view.displayNone([$purchasedManuel.lotto, $stats.lotto]);
        [...$purchasedManuel.numbers].forEach($number => this._view.setInputValue($number));
        this.#initNumbersValue();
        this._stateModel.setPurchasedState('purchased', false);

        this._view.disableButton([
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
        this._stateModel.setRefreshState('reset', true);

        const params = {
            sectionType: SECTIONTYPE.PURCHASE,
            value: $purchased.amount.value
        }
        if (!this._validator.validate(params)) return;

        this._stateModel.setPurchasedState('price', $purchased.amount.value);
        this._stateModel.setPurchasedState('purchasedUnit', $purchased.amount.value / PRICE_PER_UNIT);
        this._view.displayBlock([$purchasedManuel.lotto]);
        this.#isInputChange = false;
        this.#setDisabledDeleteButton();
    }

    purchase() {
        if (this._stateModel.purchasedState.purchased || !this.#isValidated()) return;
        this._stateModel.setPurchasedState('purchased', true);
        if (this.#hasNumberSetManuel()) {
            this._stateModel.setNumbersState('numberSetManuel', this.numberSetManuel);
        }

        this._view.disableButton([
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
        this._view.appendElement($purchasedManuel.set, stringParserToHTML($lottoManuel));
        this.#setDisabledDeleteButton();
        $purchasedManuel.inputs = this._view.updateSelector({
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
            this._view.disableButton([$purchasedManuel.deleteButton], true);
            return;
        }

        return this._view.disableButton([$purchasedManuel.deleteButton], false);
    }

    #setAutoFocus(e) {
        const $InputNextSibling = e.target.nextElementSibling;
        const isValueMaxLength = e.target.maxLength === e.target.value.length;
        if ($InputNextSibling !== null && isValueMaxLength) {
            this._view.setFocus($InputNextSibling);
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
                .forEach($input => this._view.setInputValue($input)));
    }

    #getManuelNumber = () => {
        return [...$purchasedManuel.inputs]
            .map($input => [...$input.children].map($input => +$input.value))
            .map(set => set.filter(num => !!num));
    }

    #hasNumberSetManuel = () => this.numberSetManuel.some(set => set.length > 0);
}