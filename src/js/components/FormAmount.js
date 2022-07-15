
const PAYMENT_UNIT = 1000;
import store from '../store/index.js';
import { COMMIT, DISPATCH } from '../constants/store.js';

export default function FormAmount() {
  const $formAmount = document.querySelector('#form-amount');
  const $inputAmount = document.querySelector('#input-amount');

  const vaildateAmount = amount => !(amount % PAYMENT_UNIT);

  const buyLottos = event => {
    event.preventDefault();
    const amount = $inputAmount.value;

    if (!vaildateAmount(amount)) {
      window.alert('로또 구입 금액을 1,000원 단위로 입력해 주세요.');
      $inputAmount.value = null;

      return;
    }

    store.commit(COMMIT.SET_AMOUNT, amount);
    store.dispatch(DISPATCH.MAKE_LOTTO_LIST);
  };

  $formAmount.addEventListener('submit', buyLottos);

  return $formAmount;
}
