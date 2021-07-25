import { ERR_MESSAGE } from './util/Constans.js';
import { getProfitRate, getWinnerInfo, matchNums } from './util/lottoUtil.js';
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
      .on('@submit', (event) => this.checkLotto(event.detail.winnerNum))
      .on('@input', (event) => this.changeFocus(event.detail.target));

    this.resultModalView
      .on('@closeModal', () => this.toggleModal())
      .on('@reset', () => this.handleReset());
  }

  handleReset() {
    this.store.reset();
    this.toggleModal(null);
    this.render();
  }

  render() {
    if (this.store.getLottos().length > 0) {
      this.purchaseSectionInfoView.show(this.store.getLottos());
      this.purchaseSectionDetailView.show(
        this.store.getLottos(),
        this.store.isDetail
      );
      this.recentLottoFormView.show();
    } else {
      this.purchaseSectionInfoView.hide();
      this.purchaseSectionDetailView.hide();
      this.recentLottoFormView.hide();
      this.purchaseFormView.resetInputPrice();
    }
  }

  toggleModal(winnerInfo) {
    this.resultModalView.toggleModal(winnerInfo);
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
  renderModal(lottos) {
    const { winnerCount, totalPrice } = getWinnerInfo(lottos);
    const purcahsePrice = this.store.getPurchasePrice();
    const profitRate = getProfitRate(totalPrice, purcahsePrice);

    this.toggleModal({ winnerCount, profitRate });
  }

  toggleSwitch() {
    this.store.toggleSwitch();
    this.renderDetail();
  }

  checkLotto(winnerNum) {
    if (!isVaildNums(winnerNum)) {
      return alert(ERR_MESSAGE.WINNER_NUMBER.INVAILD_NUMS);
    }
    if (!isUniqueNum(winnerNum)) {
      return alert(ERR_MESSAGE.WINNER_NUMBER.DUPLICATE_NUMS);
    }
    this.store.getLottos().forEach((lotto) => {
      const matchInfo = matchNums(lotto.getNumbers(), winnerNum);
      this.store.setMatchInfo(lotto, matchInfo);
    });
    this.renderModal(this.store.getLottos());
  }

  purchaseLottos(price) {
    if (!isVaildPrice(price)) {
      alert(ERR_MESSAGE.LOTTO.INVAILD_PRICE);
      return this.purchaseFormView.resetInputPrice();
    }
    this.store.setPurchasePrice(price);
    this.store.setLotto(price);
    this.render();
  }
}
