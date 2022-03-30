import { $eventBindedComponent } from '../../helper/index.js';
import LottoService from '../../services/Lotto.service.js';
import { toggleShowLottoNumber } from './LottoList.actions.js';
import LottoListTemplate from './LottoList.template.js';

const LottoList = $eventBindedComponent(manualPurchaseLotto => {
  const $template = LottoListTemplate({
    numbers: LottoService.generatedLotto(manualPurchaseLotto),
  });
  const $events = [
    {
      type: 'change',
      callback: toggleShowLottoNumber,
    },
  ];

  return [$template, $events];
});

export default LottoList;
