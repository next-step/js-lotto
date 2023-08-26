class LottoWinningCondition {
    #winningNumbers;
    #bonusNumber;

    constructor(winningNumbersString, BonusNumberString) {
        const winningNumbers = winningNumbersString.split(",").map((number) => Number(number));
        const bonusNumber = Number(BonusNumberString);

        this.#winningNumbers = winningNumbers;
        this.#bonusNumber = bonusNumber;
    }

    get winningNumbers() {
        return this.#winningNumbers;
    }

    get bonusNumber() {
        return this.#bonusNumber;
    }

}

export default LottoWinningCondition;