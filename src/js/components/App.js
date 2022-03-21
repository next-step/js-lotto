import BuyLottoSection from './BuyLottoSection.js';
import ShowLottoNumberSection from './ShowLottoNumberSection.js';
import { store } from '../store/store.js';
import { $ } from '../utils/dom.js';

export default class App {
  constructor() {
    const $BuyLottoSection = $('#lotto-form');
    const $ShowLottoNumberSection = $('#lotto-num-form');

    store.subscribe(() => {
      new BuyLottoSection($BuyLottoSection);
      new ShowLottoNumberSection($ShowLottoNumberSection);
    });
    this.initStore();
  }

  initStore() {
    store.dispatch('');
  }
}
