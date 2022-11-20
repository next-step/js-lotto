import { createElement, createTextNode } from "../core/DOM.js";

const lottoSection = document.getElementById('lotto-section');
const lottoCount = document.getElementById('lotto-count');
const lottoSwitch = document.getElementById('lotto-switch');
const lottoList = document.getElementById('lotto-list');

export function LottoList(lottos) {
  if (!lottos || lottos.length <= 0) {
    return null;
  }

  lottoCount.replaceChildren(`총 ${lottos.length}개를 구매하였습니다.`);

  const Lottos = createElement('ul', { className: 'd-flex flex-wrap', children: lottos.map((lottoNumbers) => Lotto(lottoNumbers)) });
  lottoList.replaceChildren(Lottos);
}

function Lotto(numbers, isNumberShow) {
  const ticket = createElement('span', { className: 'lotto-icon', children: [createTextNode('🎟️ ')] });

  const showClassName = isNumberShow ? '' : 'none';
  const lottoNumbers = createElement('span', { className: `text-xl ml-4 ${showClassName}`, children: [createTextNode(numbers.join(', '))] });

  return createElement('li', { className: 'mx-1 text-4xl d-flex items-center', children: [ticket, lottoNumbers] });
}
