import BuyLottoSection from './BuyLottoSection.js';
import ShowLottoNumberSection from './ShowLottoNumberSection.js';
import ShowResultSection from './ShowResultSection.js';
import store from '../store/store.js';
import { $ } from '../utils/dom.js';

export default class App {
  constructor() {
    const $BuyLottoSection = $('#lotto-form');
    const $ShowLottoNumberSection = $('#lotto-num-form');
    const $ShowResultSection = $('#lotto-win-form');

    store.subscribe(() => {
      new BuyLottoSection($BuyLottoSection);
      new ShowLottoNumberSection($ShowLottoNumberSection);
      new ShowResultSection($ShowResultSection);
    });

    this.initStore();
  }

  initStore() {
    store.dispatch('');
  }
}
