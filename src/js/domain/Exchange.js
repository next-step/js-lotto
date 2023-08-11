import { LOTTO_PRIZE_TABLE } from '../constants/lotto-config.js';

class Exchange {
  getLottoPrize({ rank }) {
    return LOTTO_PRIZE_TABLE[rank] ? LOTTO_PRIZE_TABLE[rank] : 0;
  }

  static calculateRateOfReturn(investment, proceeds) {
    return (proceeds / investment) * 100;
  }
}

export default Exchange;
