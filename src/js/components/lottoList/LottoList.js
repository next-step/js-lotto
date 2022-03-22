import { $, $all, $elementToggleClass, $renderWithEventBind } from '../../helper/index.js';
import useLottoService from '../../services/lotto.js';
import LottoListTemplate from './LottoListTemplate.js';

const LottoList = $renderWithEventBind(count => {
  const { purchasesLotto } = useLottoService();
  const $template = LottoListTemplate({ numbers: purchasesLotto(count) });
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
