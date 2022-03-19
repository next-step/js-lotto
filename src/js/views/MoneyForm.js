import { CLASS } from '../const/className.js';
import { emit, $ } from '../dom/index.js';

const onSubmit = ($moneyForm, $clonedApp) => {
  const onSubmitMoney = (event) => {
    event.preventDefault();
    const money = Number($(CLASS.MONEY, $moneyForm)?.value ?? 0);
    emit('@buy', money, $clonedApp);
  };

  $moneyForm.addEventListener('submit', onSubmitMoney);
};

export default {
  onSubmit,
};
