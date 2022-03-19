import { $ } from '../helper/index.js';
import AppTemplate from './AppTemplate.js';
import LottoList from './lottoList/LottoList.js';
import LottoCheck from './lottoCheck/LottoCheck.js';

const App = () => {
  const $template = AppTemplate();

  const start = () => {
    document.body.insertAdjacentHTML('afterbegin', $template);

    $('[data-props="amount-input"]').addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      purchaseAuto(event);
    });

    $('[data-props="confirm-button"]').addEventListener('click', purchaseAuto);
  };

  const purchaseAuto = event => {
    event.preventDefault();

    const { value: amount } = $('[data-props="amount-input"]');
    const lottoList = LottoList(amount);
    const lottoCheck = LottoCheck();
    $('.lotto-section').replaceChildren(lottoList, lottoCheck);
    $('.lotto-section').classList.remove('hidden');
  };

  return {
    start,
  };
};

export default App();
