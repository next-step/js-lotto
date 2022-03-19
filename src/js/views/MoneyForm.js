import { CLASS } from '../const/className.js';
import { emit, $ } from '../dom/index.js';

const onSubmit = ($app) => {
  const $moneyForm = $(CLASS.MONEY_FORM, $app);
  const onSubmitMoney = (event) => {
    event.preventDefault();
    const money = Number($(CLASS.MONEY, $moneyForm)?.value ?? 0);
    emit('@buy', money, $app);
  };

  $moneyForm.addEventListener('submit', onSubmitMoney);
};

export default {
  bindEvents(...args) {
    onSubmit(...args);
  },
};
