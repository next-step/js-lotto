import LottoTicket from './LottoTicket';
import { generateLottoNumberArray } from '../utils/LottoUtil';
import { LOTTO } from '../constants';
import LottoThrowMessage from '../utils/LottoThrowMessage';

const LottoMachine = {
  sellAutoLottoTicket(cost) {
    new LottoThrowMessage(cost)
      .maxSafeInteger()
      .integer()
      .checkCost(LOTTO.PRICE);

    const sellCount = Math.floor(cost / LOTTO.PRICE);

    return Array.from(
      { length: sellCount },
      () => new LottoTicket(generateLottoNumberArray())
    );
  },
};

export default LottoMachine;
