import { LOTTO_ICON } from '../util/Constant.js';

/**
 * @param {number[]} lottos
 */
export function setLottos(lottos = []) {
  const $lottoItems = lottos.map((lotto) => getLottoItem(lotto));
  const $lottoList = getLottoList($lottoItems);
  const $lottoIcons = document.querySelector('.lotto-icons');

  $lottoIcons.appendChild($lottoList);
  document.querySelector('.purchasing-status').innerText = `총 ${lottos.length}개를 구매하였습니다.`;
}

/**
 * @param {HTMLElement} $lottoItems
 * @returns {HTMLElement}
 */
export function getLottoList($lottoItems = []) {
  const $lottoList = document.createElement('ul');
  $lottoList.classList.add('d-flex', 'flex-wrap');
  $lottoItems.forEach(($item) => $lottoList.appendChild($item));

  return $lottoList;
}

/**
 * @param {number[]} lottos
 * @returns {HTMLElement}
 */
export function getLottoItem(lotto = []) {
  const $lottoItem = document.createElement('li');
  $lottoItem.innerHTML = `
    <span class="mx-1 text-4xl lotto-icon">${LOTTO_ICON}</span>
    <span class="hidden lotto-detail">${lotto.join(', ')}</span>
  `;

  return $lottoItem;
}

export function setLottoNumberToggle() {
  const $lottoList = document.querySelector('.lotto-icons > ul');
  $lottoList.classList.toggle('flex-col');
  $lottoList.querySelectorAll('span:last-child').forEach(($span) => $span.classList.toggle('hidden'));
}
