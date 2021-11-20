import { getLottoAmount, issueLottos } from '../service/lotto.js';
import {
  setBriefMode,
  setDetailMode,
  updateLottoContainer,
  updateLottoCount,
} from '../view/lotto.js';

const buyLotto = (price) => {
  const lottoAmount = getLottoAmount(price);
  const lottos = issueLottos(lottoAmount);

  updateLottoCount(lottoAmount);
  updateLottoContainer(lottos);
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
