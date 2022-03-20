import { $, $all, $renderWithEventBind } from '../../helper/index.js';
import useLottoService from '../../services/lotto.js';
import LottoListTemplate from './LottoListTemplate.js';

const LottoList = $renderWithEventBind(count => {
  const { purchasesLotto } = useLottoService();
  const $template = LottoListTemplate({ numbers: purchasesLotto(count) });

  const $events = [
    {
      type: 'change',
      callback: ({ target }) => {
        if (!target.matches('[data-props="toggle-button"]')) return;
        $all('.lotto-numbers').forEach(item => item.classList.toggle('d-none'));
        $('.lotto-list').classList.toggle('flex-col');
      },
    },
  ];

  return [$template, $events];
});

export default LottoList;
