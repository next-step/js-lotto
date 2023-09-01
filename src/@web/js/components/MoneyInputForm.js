import Input from "./Input";
import Button from "./Button";
import {isNaturalNumber, isValidNumberString} from "../../../utils/validate";
import {LOTTO_INFO} from "../../../consts/Lotto";

export default class MoneyInputForm {
    #$moneyInputForm;
    #$moneyInput;
    #$moneyInputSubmitButton;
    #state = {
        money: 0
    }
    constructor({$target, onSubmit}) {
        this.#$moneyInputForm = $target;
        this.#$moneyInput = new Input({
            $target: this.#$moneyInputForm.querySelector("#money-input"),
            onChange: () => {
                this.#state.money = this.#$moneyInput.value;
            }
        });
        this.#$moneyInputSubmitButton = new Button({
            $target: this.#$moneyInputForm.querySelector("#money-input-submit-button"),
            onClick: () => {
                try {
                    this.#validateForm(this.#state);
                    onSubmit(this.#state);
                } catch (e) {
                    this.#$moneyInput.setValue("");
                    alert(e.message);
                }
            }
        });
    }

    #validateForm(value) {
        this.#validateMoneyInput(value.money);
    };

    #validateMoneyInput(value) {
        if(!isValidNumberString(value))
            throw new Error("입력은 숫자만 가능합니다.");
        if(!isNaturalNumber(value))
            throw new Error("로또 구입 금액은 자연수여야 합니다.");
        if(!this.#isMultipleOfLottoPrice(Number(value)))
            throw new Error(`로또 구입 금액은 ${LOTTO_INFO.PRICE}의 배수여야 합니다.`);
    }

    #isMultipleOfLottoPrice(value) {
        return value % LOTTO_INFO.PRICE === 0;
    }
}