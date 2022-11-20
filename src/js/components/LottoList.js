import { createElement, createTextNode } from "../core/DOM.js";
import { lottoStore } from '../store/LottoStore.js';

const lottoSection = document.getElementById('lotto-section');
const lottoCount = document.getElementById('lotto-count');
const lottoSwitch = document.getElementById('lotto-switch');
const lottoList = document.getElementById('lotto-list');

lottoSwitch.addEventListener('change', (e) => {
  const checked = e.currentTarget.checked;
  lottoStore.dispatch('toggleLottoNumber', checked);
})

export function LottoList({ lottos, isShowLottoNumbers, isShow }) {
  if (!isShow) {
    lottoSection.classList.add('hide');
    return;
  }

  if (!lottos || lottos.length <= 0) {
    return null;
  }

  lottoSection.classList.remove('hide');
  lottoCount.replaceChildren(`총 ${lottos.length}개를 구매하였습니다.`);

  const Lottos = createElement('ul', { className: 'd-flex flex-wrap', children: lottos.map((lottoNumbers) => Lotto(lottoNumbers, isShowLottoNumbers)) });
  lottoList.replaceChildren(Lottos);
}

function Lotto(numbers, isNumberShow) {
  const ticket = createElement('span', { className: 'lotto-icon', children: [createTextNode('🎟️ ')] });

  const showClassName = isNumberShow ? '' : 'd-none';
  const lottoNumbers = createElement('span', { className: `text-xl ml-4 ${showClassName}`, children: [createTextNode(numbers.join(', '))] });

  return createElement('li', { className: 'mx-1 text-4xl d-flex items-center', children: [ticket, lottoNumbers] });
}
