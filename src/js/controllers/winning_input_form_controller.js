import Controller from './controller.js';

class WinningInputFormController extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  handleClickShowResultButton() {
    if (this.model.validateWinningNumbers()) {
      this.model.showResult();
    }
  }

  addChangeEvent({ target }) {
    if (this.view.$winningLottoNumbersForm.contains(target)) {
      const numberIndex = target.name;
      this.model.setWinningNumbers(Number(target.value), numberIndex);
    }
  }

  addClickEvent(event) {
    const { target } = event;
    if (this.view.$showResultButton.contains(target)) {
      event.preventDefault();
      this.handleClickShowResultButton();
    }
  }
}

export default WinningInputFormController;
