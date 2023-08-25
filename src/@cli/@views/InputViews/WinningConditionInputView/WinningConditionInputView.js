import Console from "../../../util/Console.js";
import {LOTTO_INFO} from "../../../../consts/Lotto.js";
import BonusNumberInputView from "../BonusNumberInputView/BonusNumberInputView.js";
import WinningNumberInputView from "../WinningNumberInputView/WinningNumberInputView.js";

class WinningConditionInputView {
    static async readInput() {
        while (true){
            try {
                const winningNumbersString = await WinningNumberInputView.readInput();
                const bonusNumberString = await BonusNumberInputView.readInput();
                WinningConditionInputView.#validateValue(winningNumbersString, bonusNumberString);
                return {winningNumbersString, bonusNumberString}
            } catch (e) {
                Console.print(e.message);
            }
        }
    }

    static #validateValue(winningNumbersString, bonusNumberString) {
        const winningNumbers = winningNumbersString.split(",").map((number) => Number(number));
        const bonusNumber = Number(bonusNumberString);
        if(!this.#isAllUniqueNumber([...winningNumbers, bonusNumber]))
            throw new Error("당첨 번호는 중복될 수 없습니다.");
        WinningConditionInputView.#validateWinningNumbers(winningNumbers);
        WinningConditionInputView.#validateBonusNumber(bonusNumber);
    }

    static #validateWinningNumbers(winningNumbers) {
        if(!this.#isAllValidLottoNumber(winningNumbers))
            throw new Error(`입력은 ${LOTTO_INFO.NUMBER_MIN} ~ ${LOTTO_INFO.NUMBER_MAX} 사이의 숫자여야 합니다.`);
    }

    static #validateBonusNumber(bonusNumber) {
        if(!this.#isValidateLottoNumber(bonusNumber))
            throw new Error(`입력은 ${LOTTO_INFO.NUMBER_MIN} ~ ${LOTTO_INFO.NUMBER_MAX} 사이의 숫자여야 합니다.`);
    }

    static #isAllValidLottoNumber (numbers) {
        return numbers.every((number) => this.#isValidateLottoNumber(number));
    }

    static #isValidateLottoNumber (number) {
        return Number(number) >= LOTTO_INFO.NUMBER_MIN && Number(number) <= LOTTO_INFO.NUMBER_MAX;
    }

    static #isAllUniqueNumber (numbers) {
        return numbers.length === new Set(numbers).size;
    }
}

export default WinningConditionInputView;