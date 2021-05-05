import {$lottoIcons} from '../utils/doms.js';
import {FLEX_COL} from '../utils/constants.js';

export const offToggle = () => {
    const $LottoDetails = document.querySelectorAll('.lotto-detail');

    $lottoIcons.classList.remove(FLEX_COL);
    $LottoDetails.forEach((lotto) => {
        lotto.style.display = 'none';
    });
};

export const onToggle = () => {
    const $LottoDetails = document.querySelectorAll('.lotto-detail');
    $lottoIcons.className += ' flex-col';

    $LottoDetails.forEach((lotto) => {
        lotto.style.display = 'inline';
    });
};
