import { mutation, action } from '../store/index.js';

const PAYMENT_UNIT = 1000;

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

    mutation.setAmount(amount);
    action.makeLottoList();
  };

  $formAmount.addEventListener('submit', buyLottos);

  return $formAmount;
}
