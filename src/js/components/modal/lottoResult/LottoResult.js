import { $eventBindedComponent } from '../../../helper/dom.js';
import LottoService from '../../../services/Lotto.service.js';
import { lottoRestart, toggleLottoResultModal } from './LottoResult.actions.js';
import LottoResultTemplate from './LottoResult.template.js';

const LottoResult = $eventBindedComponent(lottery => {
  const winningResult = LottoService.lotterySummary(lottery);
  const profitRate = LottoService.profitRateCalculate(winningResult);
  const $template = LottoResultTemplate({ winningResult, profitRate });
  const $events = [
    { type: 'click', callback: toggleLottoResultModal },
    { type: 'click', callback: lottoRestart },
  ];
  return [$template, $events];
});

export default LottoResult;
