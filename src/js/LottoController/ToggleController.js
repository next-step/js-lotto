import {$lottoIcons} from '../utils/doms.js';

export const offToggle = () => {
    const $LottoDetails = document.querySelectorAll('.lotto-detail');

    $lottoIcons.classList.remove('flex-col');
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
