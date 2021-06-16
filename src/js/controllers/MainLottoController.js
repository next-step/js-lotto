import { $, isVaildMoney, isValidLotto } from '../utils/utils.js';
import LottoModel from '../models/LottoModel.js';
import PurchaseFormView from '../views/PurchaseFormView.js';
import LottoSectionView from '../views/LottoSectionView.js';
import LottoNumberFormView from '../views/LottoNumberFormView.js';
import ResultModalView from '../views/ResultModalView.js';
import WinnerLottoController from './WinnerLottoController.js';
import { LOTTO, ALERT, PRICE } from '../utils/constants.js';

export default class MainLottoController {
  constructor() {
    this.purchaseFormView = new PurchaseFormView($('#purchase-form'));
    this.lottoSectionView = new LottoSectionView($('#lotto-section'));
    this.lottoNumberFormView = new LottoNumberFormView($('#lotto-number-form'));
    this.resultModalView = new ResultModalView($('#result-modal'));
    this.lottoModel = new LottoModel();
    this.winningLottoController = new WinnerLottoController();
    this._totalPriceMoney = 0;
    this.render();
  }

  init() {
    this.purchaseFormView.show().init();
    this.lottoSectionView.hide();
    this.lottoNumberFormView.hide().init();
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

    this.resultModalView.on('@resetLotto', () => {
      this.resetLotto();
    });
  }

  resetLotto() {
    this.init();
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

  setTotalPurchaseMoney() {
    return this.lottoModel.lottos.length * 1000;
  }

  setLottoYield(totalPurchaseMoney) {
    return Math.floor((this._totalPriceMoney - totalPurchaseMoney) / 100);
  }

  setLottoRank(lottoRank) {
    return [...Object.keys(lottoRank)].reverse().map((rank) => {
      const { match, money } = PRICE.find((priceInfo) => priceInfo.rank === Number(rank));
      const count = lottoRank[rank];
      this.totalPriceMoney = this.totalPriceMoney + count * money;
      return {
        match: money === LOTTO.BONUS_PRICE ? LOTTO.BONUS_RANK : `${match}개`,
        money,
        count,
      };
    });
  }

  setWinningLottoNumber(lottos) {
    if (!isValidLotto(lottos)) {
      alert(ALERT.DUPLICATED_NUMBER);
      return;
    }

    const rankHash = this.winningLottoController.setLottos({
      winningNumbers: lottos,
      lottos: this.lottoModel.lottos,
    });
    const priceInfo = this.setLottoRank(rankHash);
    const totalPurchaseMoney = this.setTotalPurchaseMoney();
    const lottoYield = this.setLottoYield(totalPurchaseMoney);
    this.resultModalView.openModal(priceInfo, lottoYield);
  }
}
