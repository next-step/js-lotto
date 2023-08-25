import {LOTTO_INFO} from "../../consts/Lotto.js";

class LottoWinningCondition {
    #winningNumbers;
    #bonusNumber;

    constructor(winningNumbersString, BonusNumberString) {
        this.#setWinningNumbers(winningNumbersString);
        this.#setBonusNumber(BonusNumberString);
    }

    #setWinningNumbers(winningNumbersString) {
       const winningNumbers = winningNumbersString.split(",").map((number) => Number(number));
       if(!this.#isAllValidLottoNumber(winningNumbers))
             throw new Error(`입력은 ${LOTTO_INFO.NUMBER_MIN} ~ ${LOTTO_INFO.NUMBER_MAX} 사이의 숫자여야 합니다.`);
       this.#winningNumbers = winningNumbers;
    }

    #setBonusNumber(bonusNumberString) {
        const bonusNumber = Number(bonusNumberString);
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

    get winningNumbers() {
        return this.#winningNumbers;
    }

    get bonusNumber() {
        return this.#bonusNumber;
    }

}

export default LottoWinningCondition;