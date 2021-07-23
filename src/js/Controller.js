import { ERR_MESSAGE } from './util/Constans.js';
import { isUniqueNum, isVaildNums, isVaildPrice } from './util/validator.js';

export default class Controller {
  constructor(
    store,
    {
      purchaseFormView,
      purchaseSectionInfoView,
      purchaseSectionDetailView,
      recentLottoFormView,
      resultModalView,
    }
  ) {
    this.store = store;

    this.purchaseFormView = purchaseFormView;
    this.purchaseSectionInfoView = purchaseSectionInfoView;
    this.purchaseSectionDetailView = purchaseSectionDetailView;
    this.recentLottoFormView = recentLottoFormView;
    this.resultModalView = resultModalView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.purchaseFormView.on('@submit', (event) =>
      this.purchaseLottos(event.detail.purchasePrice)
    );

    this.purchaseSectionInfoView.on('@change', () => this.toggleSwitch());

    this.recentLottoFormView
      .on('@submit', (event) => this.checkLotto(event.detail.lottoNums))
      .on('@input', (event) => this.changeFocus(event.detail.target));

    this.resultModalView.on('@closeModal', () => this.toggleModal());
  }

  render() {
    if (this.store.getLottos().length > 0) {
      this.purchaseSectionInfoView.show(this.store.getLottos());
      this.purchaseSectionDetailView.show(
        this.store.getLottos(),
        this.store.isDetail
      );
      this.recentLottoFormView.show();
    }
  }

  toggleModal() {
    this.resultModalView.toggleModal();
  }

  changeFocus(target) {
    if (target.value.length !== 2) return;
    this.recentLottoFormView.changeFocus(target);
  }

  renderDetail() {
    this.purchaseSectionDetailView.show(
      this.store.getLottos(),
      this.store.isDetail
    );
  }
  renderModal() {
    this.resultModalView.toggleModal();
  }

  toggleSwitch() {
    this.store.toggleSwitch();
    this.renderDetail();
  }

  checkLotto(lottoNums) {
    if (!isVaildNums(lottoNums)) {
      return alert(ERR_MESSAGE.WINNER_NUMBER.INVAILD_NUMS);
    }
    if (!isUniqueNum(lottoNums)) {
      return alert(ERR_MESSAGE.WINNER_NUMBER.DUPLICATE_NUMS);
    }
    this.renderModal();
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
