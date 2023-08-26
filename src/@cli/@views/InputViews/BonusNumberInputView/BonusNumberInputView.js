import Console from "../../../util/Console.js";

class BonusNumberInputView {
    static async readInput() {
        while (true) {
            try {
                const value = await Console.readLine("\n> 보너스 번호를 입력해 주세요. ");
                BonusNumberInputView.#validateValue(value);
                return value;
            } catch (e) {
                Console.print(e.message);
            }
        }
    }

    static #validateValue(value) {
        if(!BonusNumberInputView.#isNaturalNumber(value))
            throw new Error("보너스 번호 입력은 자연수만 가능합니다.");
    };

    static #isNaturalNumber(value) {
        return Number.isInteger(Number(value)) && Number(value) > 0;
    }
}

export default BonusNumberInputView;