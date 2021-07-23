import { ERR_MESSAGE } from './util/Constans.js';
import { isUniqueNum, isVaildNums, isVaildPrice } from './util/validator.js';

export default class Controller {
  constructor(
    store,
    {
      purchaseFormView,
      purchaseSectionView,
      recentLottoFormView,
      resultModalView,
    }
  ) {
    this.store = store;

    this.purchaseFormView = purchaseFormView;
    this.purchaseSectionView = purchaseSectionView;
    this.recentLottoFormView = recentLottoFormView;
    this.resultModalView = resultModalView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.purchaseFormView.on('@submit', (event) =>
      this.purchaseLottos(event.detail.purchasePrice)
    );

    this.purchaseSectionView.on('@change', () => this.toggleSwitch());

    this.recentLottoFormView
      .on('@submit', (event) => this.checkLotto(event.detail.lottoNums))
      .on('@input', (event) => this.changeFocus(event.detail.target));
  }

  render() {
    if (this.store.isModal) {
      this.resultModalView.show();
    } else {
      this.resultModalView.hide();
    }

    if (this.store.getLottos().length > 0) {
      this.purchaseSectionView.show(
        this.store.getLottos(),
        this.store.isDetail
      );
      this.recentLottoFormView.show();
    } else {
      this.purchaseSectionView.hide();
      this.recentLottoFormView.hide();
    }
  }

  changeFocus(target) {
    if (target.value.length !== 2) return;
    this.recentLottoFormView.changeFocus(target);
  }

  toggleSwitch() {
    this.store.toggleSwitch();
    this.render();
  }

  checkLotto(lottoNums) {
    if (!isVaildNums(lottoNums)) {
      return alert(ERR_MESSAGE.WINNER_NUMBER.INVAILD_NUMS);
    }
    if (!isUniqueNum(lottoNums)) {
      return alert(ERR_MESSAGE.WINNER_NUMBER.DUPLICATE_NUMS);
    }
    this.store.toggleModal();
    this.render();
  }

  purchaseLottos(price) {
    if (!isVaildPrice(price)) {
      alert(ERR_MESSAGE.LOTTO.INVAILD_PRICE);
      return this.purchaseFormView.resetInputPrice();
    }

    this.store.setLotto(price);
    this.render();
  }
}
