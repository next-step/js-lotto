import { LOTTO_INFO, ALERT } from '../constants/constants.js';
import { getFormDataValue } from '../utils/utils.js';
import {
  PurchaseFormSection,
  PurchasedLottoSection,
  WinningNumberFormSection,
  ResultModalSection
} from '../view/index.js';
import LottoModel from '../model/LottoModel.js';
import WinningPrizeModel from '../model/WinningPrizeModel.js';

export default class MainController {
  constructor({
    purchaseFormSection,
    purchasedLottoSection,
    winningNumberFormSection,
    resultModalSection
  }) {
    this.purchaseFormSection = new PurchaseFormSection(purchaseFormSection);
    this.purchasedLottoSection = new PurchasedLottoSection(
      purchasedLottoSection
    );
    this.winningNumberFormSection = new WinningNumberFormSection(
      winningNumberFormSection
    );
    
    this.resultModalSection = new ResultModalSection(resultModalSection);
    this.winningPrizeModel = new WinningPrizeModel();
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
      if (!this.setAutoLottoNumbers(price)) return;
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
      console.log('reset');
      this.init();
      this.resultModalSection.hide().hideModal();
    });
  }

  isInvalidPrice(price) {
    return !!(price % LOTTO_INFO.PRICE_UNIT);
  }

  setAutoLottoNumbers(price) {
    if (this.isInvalidPrice(price)) {
      this.init();
      alert(ALERT.CHECK_UNIT);
      return false;
    }

    this.lottoModel.setAutoLottos(price);
    return true;
  }
}
