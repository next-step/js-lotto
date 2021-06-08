import {onModalOpen} from '../ModalController/ModalController.js';
import {ERROR_MESSAGE} from '../utils/constants.js';
import {$winningNumber, $bonusNumber} from '../utils/doms.js';
import {checkDuplicates, checkValidNumber} from '../utils/validations.js';

export let winningNumberList = [];
export let bonusNumber = 0;
export let includeBonusList = [];

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
        winningNumberList = [];
        includeBonusList = [];

        $winningNumber.forEach(($number) => {
            const number = Number($number.value);
            winningNumberList.push(number);
            includeBonusList.push(number);
        });

        bonusNumber = Number(bonus);
        includeBonusList.push(bonusNumber);

        if (checkDuplicates(includeBonusList)) return alert(ERROR_MESSAGE.LOTTO_NUMBER_DUPLICATE);

        onModalOpen();
    }
};
