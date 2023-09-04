import Input from "./Input";
import Button from "./Button";
import {LOTTO_INFO} from "../../../consts/Lotto";

export default class WinningConditionInputForm {
    #$winningInputForm;
    #$winningNumberInputs;
    #$bonusNumberInput;
    #$winningConditionFormSubmitButton;
    #state = {
        winningNumbers: [null,null,null,null,null,null],
        bonusNumber: null
    }

    constructor({$target, onSubmit}) {
        this.#$winningInputForm = $target;
        this.#$winningNumberInputs = $target.querySelectorAll(".winning-number").forEach(($input, index) =>
            new Input({$target: $input, onChange: () => {
                    this.#state.winningNumbers[index] = Number($input.value) ?? null;
                }
            })
        );
        this.#$bonusNumberInput = new Input({
            $target : $target.querySelector(".bonus-number"),
            onChange:() => {
                this.#state.bonusNumber = Number(this.#$bonusNumberInput.value) ?? null;
            }
        });
        this.#$winningConditionFormSubmitButton = new Button({
            $target: this.#$winningInputForm.querySelector("#winning-condition-form-submit-button"),
            onClick: () => {
                try{
                    this.#validateValue(this.#state.winningNumbers, this.#state.bonusNumber);
                    onSubmit(this.#state);
                } catch (e) {
                    alert(e.message)
                }
            }
        })
        this.#$winningInputForm.style.display = "none";
    }

    setState(nextState) {
        this.#state = {
            ...this.#state,
            ...nextState
        };
    }

    render() {
        this.#$winningInputForm.style.display = "block";
    }

    #validateValue(winningNumbers, bonusNumber) {
        const numbers = [...winningNumbers, bonusNumber];
        if(!this.#isAllValidLottoNumber(numbers))
            throw new Error(`입력은 ${LOTTO_INFO.NUMBER_MIN} ~ ${LOTTO_INFO.NUMBER_MAX} 사이의 숫자여야 합니다.`);
        if(!this.#isAllUniqueNumber(numbers))
            throw new Error("당첨 번호는 중복될 수 없습니다.");
    }

    #isAllValidLottoNumber (numbers) {
        return numbers.every((number) => this.#isValidateLottoNumber(number));
    }

    #isValidateLottoNumber (number) {
        return Number(number) >= LOTTO_INFO.NUMBER_MIN && Number(number) <= LOTTO_INFO.NUMBER_MAX;
    }

    #isAllUniqueNumber (numbers) {
        return numbers.length === new Set(numbers).size;
    }
}