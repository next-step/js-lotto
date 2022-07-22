import { INITIAL_PURCHASE_TEXT_LABEL } from '../constants.js';

class LottoPurchaseSection {
  constructor(lottoPurchaseSection, lottoPurchaseTextLabel) {
    this.lottoPurchaseSection = lottoPurchaseSection;
    this.lottoPurchaseTextLabel = lottoPurchaseTextLabel;
  }

  isAlreadyExistList() {
    return this.lottoPurchaseSection.classList.contains('is-active');
  }

  renderPurchasedCount(dividedLottoCount) {
    this.lottoPurchaseSection.classList.add('is-active');
    this.lottoPurchaseTextLabel.textContent = `총 ${dividedLottoCount}개를 구매하였습니다.`;
  }

  resetPurchasedCount() {
    this.lottoPurchaseSection.classList.remove('is-active');
    this.lottoPurchaseTextLabel.textContent = INITIAL_PURCHASE_TEXT_LABEL;
  }
}

export default LottoPurchaseSection;
