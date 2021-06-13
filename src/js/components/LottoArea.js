import { $, addEvent, getRandomNumberArray } from '../utils/utils.js';
import { MESSAGE, LOTTO } from '../constants/constants.js';

class Lotto {
  constructor() {
    this.numbers = getRandomNumberArray();
  }
}

export default function LottoArea(app) {
  this.toggle = false;

  const lottoArea = $({ target: app.container, selector: '.lotto-area' });
  const lottoCount = $({ target: lottoArea, selector: '.lotto-count' });
  const lottoBox = $({ target: lottoArea, selector: '.lotto-box' });
  const lottoToggle = $({
    target: lottoArea,
    selector: '.lotto-numbers-toggle-button',
  });

  this.setLottoCount = count => {
    lottoCount.innerText = +count;
  };

  this.setLotto = count => {
    let lottos = [];
    while (count) {
      lottos = [...lottos, new Lotto()];
      count--;
    }
    app.lotto = lottos;
    showLotto(this.toggle);
  };

  const showLotto = toggleState => {
    lottoBox.innerHTML = '';
    if (!toggleState) {
      app.lotto.map(lotto => {
        const test = document.createElement('div');
        test.innerHTML = LOTTO('');
        lottoBox.appendChild(test);
      });
      lottoBox.classList.remove('d-flex-column');
    } else {
      app.lotto.map(lotto => {
        const test = document.createElement('div');
        test.innerHTML = LOTTO(lotto.numbers.join(','));
        lottoBox.appendChild(test);
      });
      lottoBox.classList.add('d-flex-column');
    }
  };

  const toggleLottoDisplay = () => {
    this.toggle = !this.toggle;
    showLotto(this.toggle);
  };

  addEvent({
    el: lottoToggle,
    type: 'click',
    callback: toggleLottoDisplay,
  });
}
