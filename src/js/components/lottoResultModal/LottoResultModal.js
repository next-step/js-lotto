import LottoService from '../../services/Lotto.service.js';
import LottoResultModalTemplate from './LottoResultModal.template.js';

const LottoResultModal = lottery => {
  const winningResult = LottoService.lotterySummary(lottery);
  const profitRate = LottoService.profitRateCalculate(winningResult);
  const $template = LottoResultModalTemplate({ winningResult, profitRate });
  return $template;
};

export default LottoResultModal;
