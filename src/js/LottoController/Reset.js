import {$inputLottoNums, $purchasedLottos, $inputPrice} from '../utils/doms.js';
import {onModalClose} from '../ModalController/ModalController.js';

export const onReset = () => {
    for (let i = 1; i < 8; i++) {
        document.getElementById(`number${i}`).value = '';
    }
    hidePurchasedLotto();
    onModalClose();
    $inputPrice.value = '';
};

const hidePurchasedLotto = () => {
    $inputLottoNums.style.visibility = 'hidden';
    $purchasedLottos.style.visibility = 'hidden';
};
