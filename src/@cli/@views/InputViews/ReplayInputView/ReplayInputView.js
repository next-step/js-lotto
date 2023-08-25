import Console from "../../../util/Console.js";

class ReplayInputView {
    static async readInput() {
        while (true) {
            try {
                const value = await Console.readLine("\n> 다시 시작하시겠습니까? (y/n) ");
                ReplayInputView.#validateValue(value);
                return value;
            } catch (e) {
                Console.print(e.message);
            }
        }
    }

    static #validateValue(value) {
       if(!ReplayInputView.#isYorN(value))
           throw new Error("y 또는 n을 입력해주세요.");
    };

    static #isYorN(value) {
        return value === "y" || value === "n";
    }
}

export default ReplayInputView;