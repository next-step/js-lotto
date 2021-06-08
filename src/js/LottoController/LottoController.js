import {onLottoPurchase} from './LottoPurchase.js';
import {onLottoDetailShow} from './LottoDetailShow.js';
import {onInputWinningNumber} from './InputWinningNumber.js';
import {onReset} from './Reset.js';
import {$inputPrice, $inputPriceBtn, $lottoSwitch, $showResultBtn, $inputNumbers, $reset} from '../utils/doms.js';

export const LottoController = () => {
    $inputPrice.addEventListener('keypress', ({key}) => {
        if (key === 'Enter') onLottoPurchase();
    });
    $inputPriceBtn.addEventListener('click', onLottoPurchase);
    $lottoSwitch.addEventListener('click', onLottoDetailShow);
    $inputNumbers.addEventListener('keypress', ({key}) => {
        if (key === 'Enter') onInputWinningNumber();
    });
    $showResultBtn.addEventListener('click', onInputWinningNumber);
    $reset.addEventListener('click', onReset);
};
