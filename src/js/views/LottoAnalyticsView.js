class LottoAnalyticsView {
  constructor() {
    this.$lastWinningNumbersForm = document.getElementById(
      "last-winning-numbers-form"
    );
  }

  onShowElement(target) {
    target.classList.remove("hide");
  }
}

export default LottoAnalyticsView;
