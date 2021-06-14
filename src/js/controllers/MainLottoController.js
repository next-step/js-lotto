import { $, isVaildMoney, isValidLotto } from '../utils/utils.js';
import LottoModel from '../models/LottoModel.js';
import PurchaseFormView from '../views/PurchaseFormView.js';
import LottoSectionView from '../views/LottoSectionView.js';
import LottoNumberFormView from '../views/LottoNumberFormView.js';
import ResultModalView from '../views/ResultModalView.js';
import { LOTTO, ALERT } from '../utils/constants.js';

export default class MainLottoController {
  constructor() {
    this.purchaseFormView = new PurchaseFormView($('#purchase-form'));
    this.lottoSectionView = new LottoSectionView($('#lotto-section'));
    this.lottoNumberFormView = new LottoNumberFormView($('#lotto-number-form'));
    this.resultModalView = new ResultModalView($('#result-modal'));
    this.lottoModel = new LottoModel();
    this.render();
  }

  init() {
    this.purchaseFormView.show();
    this.lottoSectionView.hide();
    this.lottoNumberFormView.hide();
  }

  render() {
    this.init();
    this.bindEvents();
  }

  bindEvents() {
    this.purchaseFormView.on('@submitMoney', ({ detail: moneyData }) => {
      this.setLottos(moneyData.get(LOTTO.MONEY));
    });

    this.lottoNumberFormView.on('@submitLottoNumbers', ({ detail: lottoNumbers }) => {
      this.setWinningLottoNumber(lottoNumbers);
    });
  }

  setLottos(price) {
    if (isVaildMoney(price)) {
      this.purchaseFormView.init();
      alert(ALERT.INVAILD_MONEY);
      return;
    }
    this.lottoModel.lottos = price;
    this.lottoSectionView.show().render(this.lottoModel.lottos);
    this.lottoNumberFormView.show();
  }

  setWinningLottoNumber(lottos) {
    if (!isValidLotto(lottos)) {
      alert(ALERT.DUPLICATED_NUMBER);
      return;
    }

    this.resultModalView.show();
  }
}
