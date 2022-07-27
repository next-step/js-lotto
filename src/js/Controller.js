export default class Controller {
  constructor(model, { inputFormView, lottoResultView, lottoListView, winningNumbersInputView, LottoModalView }) {
    this.model = model;
    this.inputFormView = inputFormView;
    this.lottoResultView = lottoResultView;
    this.lottoListView = lottoListView;
    this.winningNumbersInputView = winningNumbersInputView;
    this.lottoModalView = LottoModalView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.inputFormView.on('@submit', ({ detail }) => this.purchase(detail));
    this.lottoResultView.on('@toggle', ({ detail }) => this.toggle(detail));
    this.winningNumbersInputView.on('@submit', ({ detail }) => this.checkLottoResult(detail));
    this.lottoModalView.on('@click', () => this.closeModal()).on('@reset', () => this.reset());
  }

  purchase({ value: paidAmount }) {
    this.model.generateLotto(paidAmount);
    this.render();
  }

  toggle({ value: isShowNumbers }) {
    this.model.toggleShowNumber(isShowNumbers);
    this.render();
  }

  checkLottoResult({ value: winningNumbers }) {
    try {
      this.model.checkWinningNumbers(winningNumbers);
      this.model.toggleShowModal(true);
      this.render();
    } catch (err) {
      window.alert(err.message);
    }
  }

  reset() {
    this.model.resetWinningNumbers();
    this.closeModal();
    this.render();
  }

  closeModal() {
    this.model.toggleShowModal(false);
    this.render();
  }

  render() {
    this.inputFormView.show(this.model.lottoNumbers);
    this.lottoResultView.show(this.model.lottoNumbers);
    this.lottoListView.show(this.model.lottoNumbers, this.model.isShowingNumbers);
    this.winningNumbersInputView.show(this.model.lottoNumbers);
    this.lottoModalView.show(this.model.isModalOpen, this.model.reward);
  }
}
