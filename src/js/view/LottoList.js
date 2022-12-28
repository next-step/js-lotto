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

  // 구입 금액을 받아서 수동 혹은 자동으로 구매할 수 있어야한다.
  // 수동으로 하나씩 구매하면서 나머지는 자동으로 뽑아주도록하는 버튼을 만든다.
  // 수동으로 하나를 구매하면, 입력한 금액에서 하나씩 뺀다.
  // 구입금액을 새로 입력하면 완전히 새로 초기화 한다.

  // TODO: 수동, 자동 구입 컴포넌트 View 추가, 이 컴포넌트 내에선 local적으로 가지고 있는다.

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
