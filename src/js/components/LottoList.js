import store from '../store/index.js';
import { registeReactiveRender } from '../reactive/index.js';
import LottoItem from './LottoItem.js';

export default function LottoList() {
  const $lottoList = document.querySelector('#lotto-list');

  const render = () => {
    const lottoListFragment = new DocumentFragment();

    $lottoList.replaceChildren(lottoListFragment);
    const lottoListHtml = store.state.lottoList.reduce(
      (html, lotto) => html + LottoItem({ lotto, visible: store.state.isVisibleLottos }),
      ''
    );
    $lottoList.innerHTML = lottoListHtml;
  };

  registeReactiveRender(render);
  return $lottoList;
}
