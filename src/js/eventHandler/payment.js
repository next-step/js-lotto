import lottoManager from '../model/lotto.js';
import { getLottoAmount } from '../service/lotto.js';
import {
  setBriefMode,
  setDetailMode,
  updateLottoCount,
  updateLottoTicketView,
} from '../view/main.js';

const buyLotto = (price) => {
  const lottoAmount = getLottoAmount(price);

  lottoManager.issue(lottoAmount);

  updateLottoCount(lottoManager.lottos.length);
  updateLottoTicketView(lottoManager.lottos);
};

export const handlePayment = (event) => {
  event.preventDefault();

  const price = event.target.elements['price'].value;

  buyLotto(price);
};

export const handleLottoDetailToggle = ({ target }) => {
  if (target.checked) {
    setDetailMode();
  } else {
    setBriefMode();
  }
};
