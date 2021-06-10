import { $, $$ } from '../utils/utils.js';
import PurchaseFormView from '../views/PurchaseFormView.js';
import LottoSectionView from '../views/LottoSectionView.js';
import LottoNumberFormView from '../views/LottoNumberFormView.js';
import ResultModalView from '../views/ResultModalView.js';

export default class MainLottoController {
  constructor() {
    this.purchaseFormView = new PurchaseFormView($('#purchase-form'));
    this.lottoSectionView = new LottoSectionView($('#lotto-section'));
    this.lottoNumberFormView = new LottoNumberFormView($('#lotto-number-form'));
    this.resultModalView = new ResultModalView($('#result-modal'));
    this.render();
  }

  render() {
    this.purchaseFormView.show();
    this.lottoSectionView.hide();
    this.lottoNumberFormView.hide();
  }
}
