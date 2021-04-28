import {lottoIconTemplate} from '../utils/templates.js';
import {MIN_WINNING_NUMBER, MAX_WINNING_NUMBER, LOTTO_PRICE} from '../utils/constants.js';
import {onToggle} from './ToggleController.js';
import {$inputPrice, $purchasedLottos, $inputLottoNums, $totalPurchased, $lottoIcons} from '../utils/doms.js';
import {checkInputPrice} from '../utils/validations.js';

export let LOTTO_NUMBER_LIST = [];
export let inputPrice = 0;
export let totalPurchasedLotto = 0;

export const onLottoPurchase = () => {
    inputPrice = $inputPrice.value;
    checkInputPrice(inputPrice);
    showPurchasedLotto();

    totalPurchasedLotto = inputPrice / LOTTO_PRICE;
    $totalPurchased.innerText = totalPurchasedLotto;
    $lottoIcons.innerHTML = '';

    LOTTO_NUMBER_LIST = [];
    for (let i = 0; i < totalPurchasedLotto; i++) {
        const lottoNumberList = [];
        let idx = 0;
        while (idx < 6) {
            const randNum = Math.floor(Math.random() * (MAX_WINNING_NUMBER - MIN_WINNING_NUMBER + 1)) + MIN_WINNING_NUMBER;
            if (lottoNumberList.includes(randNum)) continue;
            lottoNumberList.push(randNum);
            idx += 1;
        }
        LOTTO_NUMBER_LIST.push(lottoNumberList);
        $lottoIcons.insertAdjacentHTML('afterbegin', lottoIconTemplate(lottoNumberList));
    }

    if ($lottoIcons.classList.contains('flex-col')) onToggle();
};

const showPurchasedLotto = () => {
    $inputLottoNums.style.visibility = 'visible';
    $purchasedLottos.style.visibility = 'visible';
};
