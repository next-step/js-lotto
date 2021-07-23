import { ERR_MESSAGE } from './util/Constans.js';
import { isVaildPrice } from './util/validator.js';

export default class Controller {
  constructor(store, { purchaseFormView, purchaseSectionView }) {
    this.store = store;

    this.purchaseFormView = purchaseFormView;
    this.purchaseSectionView = purchaseSectionView;

    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.purchaseFormView.on('@submit', (event) =>
      this.purchaseLottos(event.detail.purchasePrice)
    );

    this.purchaseSectionView.on('@change', () => {
      this.toggleSwitch();
    });
  }

  render() {
    if (this.store.getLottos().length > 0) {
      this.purchaseSectionView.show(
        this.store.getLottos(),
        this.store.isDetail
      );
    }
  }
  toggleSwitch() {
    this.store.toggleSwitch();
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
