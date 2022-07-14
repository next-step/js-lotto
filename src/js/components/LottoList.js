import { state } from '../store/index.js';
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

    state.lottoList.forEach(lotto => {
      $lottoList.appendChild(LottoItem({ lotto, visible: state.isVisibleLottos }));
    });
  };

  registeReactiveRender(render);
  return $lottoList;
}
