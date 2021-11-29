import { LOTTO_INFO, ALERT } from '../constants/constants.js';
import { getFormDataValue } from '../utils/utils.js';
import {
  PurchaseFormSection,
  PurchasedLottoSection,
  WinningNumberFormSection,
  ResultModalSection,
  ManualLottoFormSection
} from '../view/index.js';
import LottoModel from '../model/LottoModel.js';
import WinningPrizeModel from '../model/WinningPrizeModel.js';

const { PRICE_UNIT } = LOTTO_INFO;

export default class MainController {
  constructor({
    purchaseFormSection,
    purchasedLottoSection,
    winningNumberFormSection,
    resultModalSection,
    manualLottoFormSection
  }) {
    this.purchaseFormSection = new PurchaseFormSection(purchaseFormSection);
    this.purchasedLottoSection = new PurchasedLottoSection(
      purchasedLottoSection
    );
    this.winningNumberFormSection = new WinningNumberFormSection(
      winningNumberFormSection
    );
    this.resultModalSection = new ResultModalSection(resultModalSection);
    this.manualLottoFormSection = new ManualLottoFormSection(
      manualLottoFormSection
    );
    this.winningPrizeModel = new WinningPrizeModel();
    this.lottoModel = new LottoModel();
    this.init();
    this.bindEvents();
  }

  init() {
    this.purchaseFormSection.init();
    this.purchasedLottoSection.hide();
    this.winningNumberFormSection.hide();
    this.manualLottoFormSection.hide();
  }

  resetView() {
    this.purchasedLottoSection.hide();
    this.winningNumberFormSection.hide();
    this.manualLottoFormSection.hide();
  }

  bindEvents() {
    this.purchaseFormSection.on('@submitPrice', ({ detail }) => {
      this.resetView();
      this.lottoModel.resetLottos();
      const price = getFormDataValue(detail, 'price');
      if (!this.setPrice(price)) return;
      // this.purchasedLottoSection.show().render(this.lottoModel.lottos);
      // this.winningNumberFormSection.show().render();
      this.lottoModel.setOriginalPrice(price);
      this.manualLottoFormSection
        .show()
        .renderRemainPrice(this.lottoModel.price);
    });

    this.winningNumberFormSection.on('@submitWinningNumber', ({ detail }) => {
      this.winningPrizeModel.setLottoInfo(this.lottoModel.lottos, {
        ...detail
      });
      this.resultModalSection.render({
        winningPrizeInfo: this.winningPrizeModel.winningPrizeInfo,
        totalPrizeMoney: this.winningPrizeModel.totalPrizeMoney,
        price: this.lottoModel.originalPrice
      });
    });

    this.resultModalSection.on('@clickResetBtn', () => {
      this.init();
      this.resultModalSection.hide().hideModal();
    });

    this.manualLottoFormSection.on('@submitManualNumber', ({ detail }) => {
      if (!this.lottoModel.price) {
        alert(ALERT.PURCHASE_LIMIT);
        return;
      }
      this.lottoModel.setManualLotto(detail.manualLottoNumbers);
      this.setPrice(this.lottoModel.price - PRICE_UNIT);
      this.manualLottoFormSection.renderRemainPrice(this.lottoModel.price);
      this.purchasedLottoSection.show().render(this.lottoModel.lottos);
    });

    this.manualLottoFormSection.on('@clickAutoNumber', () => {
      if (!this.lottoModel.price) {
        alert(ALERT.PURCHASE_LIMIT);
        return;
      }
      this.lottoModel.setAutoLottos(this.lottoModel.price);
      this.setPrice(0);
      this.manualLottoFormSection.renderRemainPrice(0);
      this.purchasedLottoSection.show().render(this.lottoModel.lottos);
      this.winningNumberFormSection.show().render();
    });

    this.winningNumberFormSection.on('@submitWinningNumber', ({ detail }) => {
      this.winningPrizeModel.setLottoInfo(this.lottoModel.lottos, {
        ...detail
      });
      this.resultModalSection.render({
        winningPrizeInfo: this.winningPrizeModel.winningPrizeInfo,
        totalPrizeMoney: this.winningPrizeModel.totalPrizeMoney,
        price: this.lottoModel.price
      });
    });

    this.resultModalSection.on('@clickResetBtn', () => {
      this.init();
      this.resultModalSection.hide().hideModal();
    });
  }

  isInvalidPrice(price) {
    return !!(price % LOTTO_INFO.PRICE_UNIT);
  }

  setPrice(price) {
    if (this.isInvalidPrice(price)) {
      this.init();
      alert(ALERT.CHECK_UNIT);
      return false;
    }
    this.lottoModel.setPrice(price);
    return true;
  }
}
