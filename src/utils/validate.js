const { LOTTO_PRICE, ERROR_MESSAGE, WIN_NUMBER_COUNT, BONUS_NUMBER_COUNT } = require('../js/constants.js')
const LottoValidator = {
    amountValidate(amount) {
        if (isNaN(amount) || amount <= 0) {
            throw new Error("유효하지 않은 입력입니다. 1 이상의 숫자를 입력해주세요.")
        }
        if (amount < LOTTO_PRICE) {
            throw new Error(ERROR_MESSAGE.AMOUNT_MIN)
        }
        return amount
    },

    checkWinningNumbers(winningNumbers) {
        console.log(winningNumbers,'winningNumbers');
        if (winningNumbers.length !== WIN_NUMBER_COUNT) {
            throw new Error(ERROR_MESSAGE.PUT_WIN_NUMBER_COUNT)
        }
        
        return winningNumbers
    },
    checkBonusNumber(bonusNumber) {
        if (bonusNumber.length !== BONUS_NUMBER_COUNT) {
            throw new Error(ERROR_MESSAGE.PUT_BONUS_NUMBER_COUNT)
        }

        return bonusNumber
    }
}
module.exports = LottoValidator;