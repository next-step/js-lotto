import store from '../store/index.js';
import { registeReactiveRender } from '../reactive/index.js';
import LottoItem from './LottoItem.js';

export default function LottoList() {
  const $lottoList = document.querySelector('#lotto-list');

  const clearElementChildren = element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  const render = () => {
    const $lottoListClone = $lottoList.cloneNode(true);
    clearElementChildren($lottoListClone);

    store.state.lottoList.forEach(lotto => {
      $lottoListClone.appendChild(LottoItem({ lotto, visible: store.state.isVisibleLottos }));
    });

    $lottoList.replaceChildren(...$lottoListClone.childNodes);
  };

  registeReactiveRender(render);
  return $lottoList;
}
