import { LOTTO_PRIZE_TABLE } from '../constants/lotto-config.js';

class Exchange {
  getLottoPrize({ rank }) {
    return LOTTO_PRIZE_TABLE[rank] ? LOTTO_PRIZE_TABLE[rank] : 0;
  }
}

export default Exchange;
