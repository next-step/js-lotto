import { $, $elementRemoveClass, $eventBindedComponent } from '../helper/index.js';
import AppTemplate from './AppTemplate.js';
import LottoList from './lottoList/LottoList.js';
import LottoCheck from './lottoCheck/LottoCheck.js';
import useLottoService from '../services/lotto.js';

const App = $eventBindedComponent(() => {
  const { validCount } = useLottoService();
  const $template = AppTemplate();
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
          $elementRemoveClass($('.lotto-section'), 'hidden');
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
