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

  bindEvents() {
    this.purchaseFormSection.on('@submitPrice', ({ detail }) => {
      const price = getFormDataValue(detail, 'price');
      if (!this.setPrice(price)) return;
      // this.purchasedLottoSection.show().render(this.lottoModel.lottos);
      // this.winningNumberFormSection.show().render();
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
        price: this.lottoModel.price
      });
    });

    this.resultModalSection.on('@clickResetBtn', () => {
      this.init();
      this.resultModalSection.hide().hideModal();
    });

    this.manualLottoFormSection.on('@submitManualNumber', ({ detail }) => {
      this.lottoModel.setManualLotto(detail.manualLottoNumbers);
      this.setPrice(this.lottoModel.price - PRICE_UNIT);
      this.manualLottoFormSection.renderRemainPrice(this.lottoModel.price);
      if (Number(this.lottoModel.price) === 0) {
        this.manualLottoFormSection.disableBtn('#submitManualLottoBtn');
        alert('마지막 수동 구매입니다. 더이상 구매할 수 없습니다.');
        return;
      }
    });

    this.manualLottoFormSection.on('@clickAutoNumber', () => {
      this.lottoModel.setAutoLottos(this.lottoModel.price);
      this.setPrice(0);
      this.manualLottoFormSection.renderRemainPrice(0);
      this.purchasedLottoSection.show().render(this.lottoModel.lottos);
      this.winningNumberFormSection.show().render();
    });
  }

  isInvalidPrice(price) {
    return !!(price % LOTTO_INFO.PRICE_UNIT);
  }

  setPrice(price) {
    console.log(price);
    if (this.isInvalidPrice(price)) {
      this.init();
      alert(ALERT.CHECK_UNIT);
      return false;
    }
    this.lottoModel.setPrice(price);
    return true;
  }

  // setAutoLottoNumbers(price) {
  //   if (this.isInvalidPrice(price)) {
  //     this.init();
  //     alert(ALERT.CHECK_UNIT);
  //     return false;
  //   }

  //   this.lottoModel.setAutoLottos(price);
  //   return true;
  // }
}
