import {onModalOpen} from '../ModalController/ModalController.js';
import {ERROR_MESSAGE} from '../utils/constants.js';
import {$winningNumber, $bonusNumber} from '../utils/doms.js';
import {checkDuplicates, checkValidNumber} from '../utils/validations.js';

export let WINNING_NUMBER_LIST = [];
export let BONUS_NUMBER = 0;
export let INCLUDE_BONUS_LIST = [];

export const onInputWinningNumber = () => {
    let cnt = 0;
    $winningNumber.forEach(($number) => {
        const number = $number.value;
        if (checkValidNumber(number)) return alert(ERROR_MESSAGE.LOTTO_NUMBER_VALID);
        cnt += 1;
    });

    const bonus = $bonusNumber.value;
    if (checkValidNumber(bonus)) return alert(ERROR_MESSAGE.LOTTO_NUMBER_VALID);

    if (cnt === 6) {
        WINNING_NUMBER_LIST = [];
        INCLUDE_BONUS_LIST = [];

        $winningNumber.forEach(($number) => {
            const number = Number($number.value);
            WINNING_NUMBER_LIST.push(number);
            INCLUDE_BONUS_LIST.push(number);
        });

        BONUS_NUMBER = Number(bonus);
        INCLUDE_BONUS_LIST.push(BONUS_NUMBER);

        if (checkDuplicates(INCLUDE_BONUS_LIST)) return alert(ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE);

        onModalOpen();
    }
};
