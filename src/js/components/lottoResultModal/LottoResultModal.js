import { $eventBindedComponent } from '../../helper/index.js';
import LottoService from '../../services/Lotto.service.js';
import LottoResultModalTemplate from './LottoResultModal.template.js';

const LottoResultModal = $eventBindedComponent(winningNumbers => {
  const winningResult = LottoService.lotterySummary(winningNumbers);
  const profitRate = LottoService.profitRateCalculate(winningResult);
  const $template = LottoResultModalTemplate({ winningResult, profitRate });
  return [$template];
});

export default LottoResultModal;
