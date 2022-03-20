import { CLASS } from '../const/className.js';
import { emit, $, convertFormDataToObject } from '../dom/index.js';

const MoneyForm = ($app) => {
  const onSubmit = () => {
    const $moneyForm = $(CLASS.MONEY_FORM, $app);

    const onSubmitMoney = (event) => {
      event.preventDefault();

      const form = convertFormDataToObject($moneyForm);
      const money = Number(form?.money ?? 0);
      emit('@buy', money, $app);
    };

    $moneyForm.addEventListener('submit', onSubmitMoney);
  };

  return {
    bindEvents() {
      onSubmit();
    },
  };
};

export default MoneyForm;
