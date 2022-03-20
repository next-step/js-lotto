import { $, $renderWithEventBind } from '../helper/index.js';
import AppTemplate from './AppTemplate.js';
import LottoList from './lottoList/LottoList.js';
import LottoCheck from './lottoCheck/LottoCheck.js';
import { validCount } from '../helper/index.js';

const App = $renderWithEventBind(() => {
  const $template = AppTemplate();
  document.body.insertAdjacentElement('afterbegin', $template);

  const $events = [
    {
      type: 'submit',
      callback: event => {
        event.preventDefault();

        const $input = $('[data-props="amount-input"]');
        try {
          const count = validCount($input.value);

          const lottoList = LottoList(count);
          const lottoCheck = LottoCheck();

          $('.lotto-section').replaceChildren(lottoList, lottoCheck);
          $('.lotto-section').classList.remove('hidden');
        } catch (error) {
          $input.value = '';
          alert(error.message);
        }
      },
    },
  ];

  return [$template, $events];
});

export default App;
