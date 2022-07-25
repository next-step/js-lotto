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

  checkLottoResult({ value: resultNumbers }) {
    try {
      this.model.setResultNumbers(resultNumbers);
      this.model.toggleShowModal(true);
      this.render();
    } catch (err) {
      window.alert(err.message);
    }
  }

  reset() {
    this.model.resetResultNumbers();
    this.closeModal();
    this.render();
  }

  closeModal() {
    this.model.toggleShowModal(false);
    this.render();
  }

  render() {
    this.inputFormView.show(this.model.winningNumbers);
    this.lottoResultView.show(this.model.winningNumbers);
    this.lottoListView.show(this.model.winningNumbers, this.model.isShowingNumbers);
    this.winningNumbersInputView.show(this.model.winningNumbers);
    this.lottoModalView.show(this.model.isModalOpen);
  }
}
