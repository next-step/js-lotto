const { LOTTO_PRICE, ERROR_MESSAGE, WIN_NUMBER_COUNT,LOTTO_RANDOM_MAX } = require('../js/utils/constants.js')
const LottoValidator = {
    amountValidate(amount) {
        if (isNaN(amount) || amount <= 0) {
            throw new Error(ERROR_MESSAGE.NONUMBER)
        }
        if (amount < LOTTO_PRICE) {
            throw new Error(ERROR_MESSAGE.AMOUNT_MIN)
        }
        return amount
    },

    checkWinningNumbers(winningNumbers) {
        if (winningNumbers.length !== WIN_NUMBER_COUNT) {
            throw new Error(ERROR_MESSAGE.PUT_WIN_NUMBER_COUNT)
        }
        const uniqueNumbers = new Set(winningNumbers);

        if (uniqueNumbers.size !== winningNumbers.length) {
            throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBERS);
        }
        if (winningNumbers.some(number => number > LOTTO_RANDOM_MAX)) {
            throw new Error(ERROR_MESSAGE.NUMBER_OVER_LIMIT);
        }
        return winningNumbers
    },
    checkBonusNumber(bonusNumber) {
        if (bonusNumber > LOTTO_RANDOM_MAX) {
            throw new Error(ERROR_MESSAGE.NUMBER_OVER_LIMIT);
        }
        return bonusNumber
    }
}
module.exports = LottoValidator;