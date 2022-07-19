class LottoPurchaseSection {
  constructor(lottoPurchaseSection, lottoPurchaseTextLabel) {
    this.lottoPurchaseSection = lottoPurchaseSection;
    this.lottoPurchaseTextLabel = lottoPurchaseTextLabel;
  }

  isAlreadyExistList = () => {
    return this.lottoPurchaseSection.classList.contains('is-active');
  };

  renderPurchasedCount = (dividedLottoCount) => {
    this.lottoPurchaseSection.classList.add('is-active');
    this.lottoPurchaseTextLabel.textContent = `총 ${dividedLottoCount}개를 구매하였습니다.`;
  };
}

export default LottoPurchaseSection;
