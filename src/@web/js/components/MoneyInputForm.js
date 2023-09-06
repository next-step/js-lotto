import {isNaturalNumber, isValidNumberString} from "../../../utils/validate";
import {LOTTO_INFO} from "../../../consts/Lotto";

export default class MoneyInputForm {
    #$moneyInputForm;
    #$moneyInput;
    #$moneyInputSubmitButton;

    constructor({initialState, onSubmit}) {
        this.#$moneyInputForm = document.querySelector("#money-input-form");
        this.#$moneyInput = this.#$moneyInputForm.querySelector("#money-input");
        this.#$moneyInputSubmitButton = this.#$moneyInputForm.querySelector("#money-input-submit-button");

        this.#$moneyInputForm.addEventListener("submit", (e) => {
            e.preventDefault();
            try {
                this.#validateMoneyInput(this.#$moneyInput.value);
                onSubmit(this.#$moneyInput.value);
            } catch (e) {
                this.#$moneyInput.value = "";
                alert(e.message);
            }
        });

        this.init(initialState);
    }

    init(initialState) {
        this.#$moneyInput.value = initialState?.money;
    }

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