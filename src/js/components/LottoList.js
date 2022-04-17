import { CLASS_NAME } from '../constants/index.js';

function createLottoElement(lotto) {
    const $lotto = document.createElement('li');
    $lotto.classList.add('mx-1', 'text-4xl');

    const $icon = document.createElement('span');
    $icon.textContent = '🎟️';

    const $lottoNumbers = document.createElement('span');
    $lottoNumbers.textContent = lotto.join(', ');
    $lottoNumbers.classList.add(CLASS_NAME.LOTTO_NUMBERS);

    $lotto.append($icon, $lottoNumbers);

    return $lotto;
}

function LottoList({ state }) {
    const { purchaseCount, lottos } = state;

    const $lottoList = document.createElement('ul');
    $lottoList.classList.add(CLASS_NAME.LOTTO_LIST, 'd-flex', 'flex-wrap');

    const $label = document.querySelector(
        `section label.${CLASS_NAME.SECTION_TITLE_LABEL}`
    );
    $label.textContent = `총 ${purchaseCount}개를 구매하였습니다.`;

    const $lottoElements = lottos.map((lotto) => createLottoElement(lotto));
    $lottoList.append(...$lottoElements);

    return $lottoList;
}

export default LottoList;
