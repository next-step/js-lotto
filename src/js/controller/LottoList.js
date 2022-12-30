import { createElement, createTextNode } from "../core/DOM.js";
import { lottoStore } from '../store/LottoStore.js';

const $lottoListContainer = document.getElementById('lotto-list');
const $lottoCount = document.getElementById('lotto-count');
const $lottoViewSwitch = document.getElementById('lotto-switch');
const $lottoListTable = document.getElementById('lotto-table');

$lottoViewSwitch.addEventListener('change', (e) => {
  const checked = e.currentTarget.checked;
  lottoStore.dispatch('toggleLottoNumber', checked);
})

export const initParmLottoList = { lottos: [], isShowLottoNumbers: false, isShow: false };

export function LottoList({ lottos, isShowLottoNumbers, isShow } = initParmLottoList) {
  if (!isShow) {
    $lottoListContainer.classList.add('hide');
    return;
  }

  if (!lottos) {
    return null;
  }

  // lotto 결과 rendering하는 부분
  $lottoListContainer.classList.remove('hide');
  $lottoCount.replaceChildren(`총 ${lottos?.length || 0}개를 구매하였습니다.`);

  const Lottos = createElement('ul', { className: 'd-flex flex-wrap', children: lottos.map((lottoNumbers) => createLottoElement(lottoNumbers, isShowLottoNumbers)) });
  $lottoListTable.replaceChildren(Lottos);
}

function createLottoElement(numbers, isNumberShow) {
  const ticket = createElement('span', { className: 'lotto-icon', children: [createTextNode('🎟️ ')] });

  const showClassName = isNumberShow ? '' : 'd-none';
  const lottoNumbers = createElement('span', { className: `text-xl ml-4 ${showClassName}`, children: [createTextNode(numbers.join(', '))] });

  return createElement('li', { className: 'mx-1 text-4xl d-flex items-center', children: [ticket, lottoNumbers] });
}
