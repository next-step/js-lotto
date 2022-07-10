import { proxyState } from '../store/index.js';
import { registeReactiveRender } from '../utils/reactiveRender.js';
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

    proxyState.lottoList.forEach(lotto => {
      $lottoList.appendChild(LottoItem({ lotto, visible: proxyState.isVisibleLottos }));
    });
  };

  registeReactiveRender(render);
  return $lottoList;
}
