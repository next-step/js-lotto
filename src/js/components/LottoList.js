import store from '../store/index.js';
import { registeReactiveRender } from '../reactive/index.js';
import LottoItem from './LottoItem.js';

export default function LottoList() {
  const $lottoList = document.querySelector('#lotto-list');

  const clearLottoList = () => {
    while ($lottoList.firstChild) {
      $lottoList.removeChild($lottoList.firstChild);
    }
  };

  const render = () => {
    clearLottoList();

    store.state.lottoList.forEach(lotto => {
      $lottoList.appendChild(LottoItem({ lotto, visible: store.state.isVisibleLottos }));
    });
  };

  registeReactiveRender(render);
  return $lottoList;
}
