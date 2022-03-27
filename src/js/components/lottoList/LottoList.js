import { $, $all, $elementToggleClass, $eventBindedComponent } from '../../helper/index.js';
import LottoService from '../../services/Lotto.service.js';
import LottoListTemplate from './LottoList.template.js';

const LottoList = $eventBindedComponent(count => {
  const $template = LottoListTemplate({ numbers: LottoService.purchasesLotto(count) });
  const $events = [
    {
      type: 'change',
      callback: ({ target: _toggleButton }) => {
        if (!_toggleButton.matches('[data-props="toggle-button"]')) return;
        $all('.lotto-numbers').forEach(item => $elementToggleClass(item, 'd-none'));
        $elementToggleClass($('.lotto-list'), 'flex-col');
      },
    },
  ];

  return [$template, $events];
});

export default LottoList;
