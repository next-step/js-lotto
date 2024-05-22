import {
    ERROR_MESSAGE_COMMA_SEPARTED,
    ERROR_MESSAGE_LACK_MONEY,
    ERROR_MESSAGE_LOTTO_LENGTH,
    ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER,
    ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS,
    ERROR_MESSAGE_RESTART,
    LOTTO_PRICE,
    LOTTO_TOTAL_COUNT,
    MIN_INPUT_NUMBERS_LENGTH
} from '../constants';

class LottoValidator {
    validWinningNumberSplitComma(numbers) {
        if (numbers.split(',').length <= MIN_INPUT_NUMBERS_LENGTH) {
            throw new Error(ERROR_MESSAGE_COMMA_SEPARTED);
        }
    }

    validCheckAmount(prices) {
        if (prices < LOTTO_PRICE) throw new Error(ERROR_MESSAGE_LACK_MONEY);
    }

    validEnterWinningNumbers(winnigNumbers) {
        if (winnigNumbers.length !== LOTTO_TOTAL_COUNT) throw new Error(ERROR_MESSAGE_NOT_ENTER_WINNING_NUMBERS);
    }

    validEnterBonusNumber(bonusNumber) {
        if (bonusNumber === 0) throw new Error(ERROR_MESSAGE_NOT_ENTER_BONUS_NUMBER);
    }

    validLottoLength(numbers) {
        if (numbers.length !== LOTTO_TOTAL_COUNT) throw new Error(ERROR_MESSAGE_LOTTO_LENGTH);
    }

    validateLottoRestart(restart) {
        const lowerCaseRestart = restart.toLowerCase();
        const allowChar = ['y', 'yes', 'n', 'no'];
        if (!allowChar.includes(lowerCaseRestart)) throw new Error(ERROR_MESSAGE_RESTART);
    }
}

export default LottoValidator;
