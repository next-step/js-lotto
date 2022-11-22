import Controller from './controller.js';

class WinningInputFormController extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  addChangeEvent({ target }) {
    if (this.view.$winningLottoNumbersForm.contains(target)) {
      const numberIndex = target.name;
      this.model.setWinningNumbers(Number(target.value), numberIndex);
    }
  }
}

export default WinningInputFormController;
