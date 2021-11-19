import { LOTTO_INFO, ALERT } from '../constants/constants.js';
import { getFormDataValue } from '../utils/utils.js';
import {
  PurchaseFormSection,
  PurchasedLottoSection,
  WinningNumberFormSection
} from '../view/index.js';
import LottoModel from '../model/LottoModel.js';

export default class MainController {
  constructor({
    purchaseFormSection,
    purchasedLottoSection,
    winningNumberFormSection
  }) {
    this.purchaseFormSection = new PurchaseFormSection(purchaseFormSection);
    this.purchasedLottoSection = new PurchasedLottoSection(
      purchasedLottoSection
    );
    this.winningNumberFormSection = new WinningNumberFormSection(
      winningNumberFormSection
    );
    this.lottoModel = new LottoModel();
    this.init();
    this.bindEvents();
  }

  init() {
    this.purchaseFormSection.init();
    this.purchasedLottoSection.hide();
    this.winningNumberFormSection.hide();
  }

  bindEvents() {
    this.purchaseFormSection.on('@submitPrice', ({ detail }) => {
      const price = getFormDataValue(detail, 'price');
      this.setAutoLottoNumbers(price);
      this.purchasedLottoSection.show().render(this.lottoModel.lottos);
      this.winningNumberFormSection.show().render();
    });
  }

  isInvalidPrice(price) {
    return !!(price % LOTTO_INFO.PRICE_UNIT);
  }

  setAutoLottoNumbers(price) {
    if (this.isInvalidPrice(price)) {
      this.init();
      alert(ALERT.CHECK_UNIT);
      return;
    }

    this.lottoModel.setAutoLottos(price);
  }
}
