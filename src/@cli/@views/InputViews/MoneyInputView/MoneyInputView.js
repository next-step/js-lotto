import Console from "../../../util/Console.js";
import {LOTTO_INFO} from "../../../../consts/Lotto.js";

class MoneyInputView {
    static async readInput() {
        const value = await Console.readLine("> 구입금액을 입력해 주세요. ");
        MoneyInputView.#validateValue(value);
        return value;
    }

    static #validateValue(value) {
        if(!MoneyInputView.#isValidNumberString(value))
            throw new Error("입력은 숫자만 가능합니다.");
        if(!MoneyInputView.#isNaturalNumber(Number(value)))
            throw new Error("로또 구입 금액은 자연수여야 합니다.");
        if(!MoneyInputView.#isMultipleOfLottoPrice(Number(value)))
            throw new Error(`로또 구입 금액은 ${LOTTO_INFO.PRICE}의 배수여야 합니다.`);
    };

    static #isValidNumberString(value) {
        const pattern = /^[0-9]+$/;
        return pattern.test(value);
    }

    static #isNaturalNumber(value) {
        return Number.isInteger(value) && value > 0;
    }

    static #isMultipleOfLottoPrice(value) {
        return value % LOTTO_INFO.PRICE === 0;
    }
}

export default MoneyInputView;