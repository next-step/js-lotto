import Controller from './controller.js';

class WinningInputFormController extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  handleClickShowResultButton() {
    if (this.model.validateWinningNumbers()) {
      this.model.computeWinningNumbers();
      this.view.$winningResultModal.classList.add('open');
    }
  }

  addChangeEvent({ target }) {
    if (this.view.$winningLottoNumbersForm.contains(target)) {
      const numberIndex = target.name;
      this.model.setWinningNumbers(Number(target.value), numberIndex);
    }
  }

  addSubmitEvent(event) {
    const { target } = event;
    if (this.view.$winningLottoNumbersForm.contains(target)) {
      event.preventDefault();
      this.handleClickShowResultButton();
    }
  }
}

export default WinningInputFormController;
