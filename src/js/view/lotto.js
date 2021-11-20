import SELECTOR from '../constant/selector.js';
import { $ } from '../util/querySelector.js';

const lottoTemplate = (lottoNumbers = []) => `
  <div class="js-lotto-ticket">
    <span class="mx-1 text-4xl">🎟️ </span>
    <span class="js-lotto-numbers">${lottoNumbers.join(', ')}</span>
  </div>
`;

export const updateLottoCount = (amount = 0) => {
  $(SELECTOR.LOTTO_COUNT).textContent = amount;
};

export const updateLottoContainer = (lottos = []) => {
  $(SELECTOR.LOTTO_CONTAINER).innerHTML = lottos.map(lottoTemplate).join('');
};

const lottoNumberHidden = 'lotto-number-hidden';

export const setBriefMode = () => {
  $(SELECTOR.LOTTO_CONTAINER).classList.add(lottoNumberHidden);
};

export const setDetailMode = () => {
  $(SELECTOR.LOTTO_CONTAINER).classList.remove(lottoNumberHidden);
};
