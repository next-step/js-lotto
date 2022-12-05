import { $ } from './utils/dom.js';
import { LOTTO } from './utils/constants.js';
import registry from './registry.js';
import applyDiff from './applyDiff.js';
import Lotto from './Lotto.js';

import appView from './views/app.js';
import lottoView from './views/lotto.js';
import counterView from './views/lottoCounter.js';
import lottoNumbersView from './views/lottoNumbers.js';
import modalView from './views/modal.js';

registry.add('app', appView);
registry.add('lotto', lottoView);
registry.add('counter', counterView);
registry.add('lottoNumbers', lottoNumbersView);
registry.add('modal', modalView);

const state = {
  purchaseAmount: 0,
  lottos: [],
  toggleOn: false,
  modalOn: false,
  rank: {
    3: 0,
    4: 0,
    5: 0,
    BONUS_WIN: 0,
    6: 0,
  },
};

const events = {
  toggleLottoNumbers: (isToggleOn) => {
    state.toggleOn = isToggleOn;
    render();
  },
  openModal: (rank) => {
    state.modalOn = true;
    state.rank = rank;
    render();
  },
  closeModal: () => {
    state.modalOn = false;
    render();
  },
  purchaseLotto: (amount) => {
    state.purchaseAmount = amount;
    const ticketCount = amount / LOTTO.PRICE_UNIT;
    state.lottos = Array.from({ length: ticketCount }, () => new Lotto());
    render();
  },
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = $('#root');
    const newMain = registry.renderRoot(main, state, events);
    applyDiff(document.body, main, newMain);
  });
};

render();
