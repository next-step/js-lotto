import { $ } from '../helper/index.js';
import AppTemplate from './AppTemplate.js';
import LottoList from './lottoList/LottoList.js';
import LottoCheck from './lottoCheck/LottoCheck.js';
import { validCount } from '../helper/index.js';

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
    try {
      const count = validCount(amount);
      const lottoList = LottoList(count);
      const lottoCheck = LottoCheck();

      $('.lotto-section').replaceChildren(lottoList, lottoCheck);
      $('.lotto-section').classList.remove('hidden');
    } catch (error) {
      $('[data-props="amount-input"]').value = '';
      alert(error.message);
    }
  };

  return {
    start,
  };
};

export default App();
