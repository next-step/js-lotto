import {LOTTO_INFO} from "../../consts/Lotto.js";

class LottoWinningCondition {
    #winningNumbers;
    #bonusNumber;

    constructor(winningNumbersString, BonusNumberString) {
        const winningNumbers = winningNumbersString.split(",").map((number) => Number(number));
        const bonusNumber = Number(BonusNumberString);

        if(!this.#isAllUniqueNumber([...winningNumbers, bonusNumber]))
            throw new Error("당첨 번호는 중복될 수 없습니다.");
        this.#setWinningNumbers(winningNumbers);
        this.#setBonusNumber(bonusNumber);
    }

    #setWinningNumbers(winningNumbers) {
       if(!this.#isAllValidLottoNumber(winningNumbers))
             throw new Error(`입력은 ${LOTTO_INFO.NUMBER_MIN} ~ ${LOTTO_INFO.NUMBER_MAX} 사이의 숫자여야 합니다.`);
       this.#winningNumbers = winningNumbers;
    }

    #setBonusNumber(bonusNumber) {
        if(!this.#isValidateLottoNumber(bonusNumber))
            throw new Error(`입력은 ${LOTTO_INFO.NUMBER_MIN} ~ ${LOTTO_INFO.NUMBER_MAX} 사이의 숫자여야 합니다.`);
        this.#bonusNumber = bonusNumber;
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

    get winningNumbers() {
        return this.#winningNumbers;
    }

    get bonusNumber() {
        return this.#bonusNumber;
    }

}

export default LottoWinningCondition;