import store from '../store/index.js';
import { registeReactiveRender } from '../reactive/index.js';

export default function LottoAmount() {
  const $lottoAmount = document.querySelector('#lotto-amount');

  const render = () => {
    const lottoAmount = store.getter.getLottoAmount();

    $lottoAmount.innerText = `총 ${lottoAmount}개를 구매하였습니다.`;
  };

  registeReactiveRender(render);
  return $lottoAmount;
}
