import { $ } from './utils/dom.js';

import registry from './registry.js';
import applyDiff from './applyDiff.js';

import appView from './views/app.js';
import lottoTemplate from './views/lottoTemplate.js';
import lottoView from './views/lotto.js';
import counterView from './views/lottoCounter.js';
import lottoNumbersView from './views/lottoNumbers.js';
// import modalView from './view/modal.js';

registry.add('app', appView);
registry.add('lottoTemplate', lottoTemplate);
registry.add('lotto', lottoView);
registry.add('counter', counterView);
registry.add('lottoNumbers', lottoNumbersView);

const state = {
  purchaseAmount: 7000,
  toggleOn: true,
  modalOn: true,
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = $('#root');
    const newMain = registry.renderRoot(main, state);
    applyDiff(document.body, main, newMain);
  });
};

render();
