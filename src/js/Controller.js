export default class Controller {
  constructor(model, { inputFormView, lottoResultView, lottoListView }) {
    this.model = model;
    this.inputFormView = inputFormView;
    this.lottoResultView = lottoResultView;
    this.lottoListView = lottoListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.inputFormView.on('@submit', ({ detail }) => this.onPurchase(detail));
    this.lottoResultView.on('@toggle', ({ detail }) => this.onToggle(detail));
  }

  onPurchase({ value: paidAmount }) {
    this.model.generateLotto(paidAmount);
    this.render();
  }

  onToggle({ value: isShowNumbers }) {
    this.model.toggleShowNumber(isShowNumbers);
    this.render();
  }

  render() {
    this.lottoResultView.show(this.model.winningNumbers);
    this.lottoListView.show(this.model.winningNumbers, this.model.isShowingNumbers);
  }
}
