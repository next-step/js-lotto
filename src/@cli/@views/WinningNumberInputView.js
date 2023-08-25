import Console from "../util/Console.js";
import {LOTTO_INFO} from "../../consts/Lotto.js";

class WinningNumberInputView {
    static async readInput() {
        const value = await Console.readLine("\n> 당첨 번호를 입력해 주세요. ");
        WinningNumberInputView.#validateValue(value);
        return value;
    }

    static #validateValue(value) {
        if(!WinningNumberInputView.#isValidNumberString(value))
            throw new Error("입력은 숫자와 쉼표만으로 이루어져야 합니다.");
        if(!WinningNumberInputView.#isAllNaturalNumber(value))
            throw new Error("쉼표로 구분된 각각의 숫자는 자연수만 가능합니다.");
        if(!WinningNumberInputView.#isSameToLottoSize(value))
            throw new Error(`입력된 숫자의 개수는 ${LOTTO_INFO.SIZE}개여야 합니다.`);
    };

    static #isValidNumberString(value) {
        const pattern = /^[0-9,]+$/;
        return pattern.test(value);
    }

    static #isAllNaturalNumber(value) {
        return value.split(",").every(number => Number.isInteger(Number(number)) && Number(number) > 0);
    }

    static #isSameToLottoSize(value) {
        return value.split(",").length === LOTTO_INFO.SIZE;
    }
}

export default WinningNumberInputView;