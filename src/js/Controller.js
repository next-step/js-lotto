export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    const { inputFormView, lottoResultView, winningNumbersInputView, lottoModalView } = this.view;
    inputFormView.on('@submit', ({ detail }) => this.purchaseLotteries(detail));
    lottoResultView.on('@toggle', ({ detail }) => this.toggleShowLottoNumbers(detail));
    winningNumbersInputView.on('@submit', ({ detail }) => this.checkLottoResult(detail));
    lottoModalView.on('@click', () => this.closeModal()).on('@reset', () => this.repurchase());
  }

  purchaseLotteries({ value: paidAmount }) {
    this.model.lotto.generateLotteries(paidAmount);
    this.render();
  }

  toggleShowLottoNumbers({ value: isShowNumbers }) {
    this.view.lottoListView.toggleShowNumber(isShowNumbers);
    this.render();
  }

  checkLottoResult({ value: winningNumbers }) {
    try {
      this.model.prize.checkWinningNumbers(this.model.lotto.lottoNumbers, winningNumbers);
      this.view.lottoModalView.openModal();
      this.render();
    } catch (err) {
      window.alert(err.message);
    }
  }

  repurchase() {
    this.model.lotto.resetWinningNumbers();
    this.closeModal();
  }

  closeModal() {
    this.view.lottoModalView.closeModal();
    this.render();
  }

  render() {
    const { inputFormView, lottoListView, lottoResultView, winningNumbersInputView, lottoModalView } = this.view;
    const { lotto, prize } = this.model;
    inputFormView.show(lotto.lottoNumbers);
    lottoResultView.show(lotto.lottoNumbers);
    lottoListView.show(lotto.lottoNumbers);
    winningNumbersInputView.show(lotto.lottoNumbers);
    lottoModalView.show(prize.reward, lotto.lottoNumbers);
  }
}
