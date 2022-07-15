import store from '../store/index.js';
import { registeReactiveRender } from '../reactive/index.js';
import LottoItem from './LottoItem.js';

export default function LottoList() {
  const $lottoList = document.querySelector('#lotto-list');

  const render = () => {
    const lottoListFragment = new DocumentFragment();

    store.state.lottoList.forEach(lotto => {
      lottoListFragment.appendChild(LottoItem({ lotto, visible: store.state.isVisibleLottos }));
    });

    $lottoList.replaceChildren(lottoListFragment);
  };

  registeReactiveRender(render);
  return $lottoList;
}
