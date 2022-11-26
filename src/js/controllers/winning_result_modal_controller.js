import Controller from './controller.js';

class WinningResultModalController extends Controller {
  constructor(view, model) {
    super(view, model);
  }

  addClickEvent({ target }) {
    if (this.view.$winningResultClose.contains(target)) {
      this.view.$winningResultModal.classList.remove('open');
    }

    if (this.view.$resetButton.contains(target)) {
      this.model.clear();
      this.view.$inputPriceForm.reset();
      this.view.$winningLottoNumbersForm.reset();
      this.view.$winningLottoNumbersForm.style.display = 'none';
      this.view.$purchasedLottos.style.display = 'none';
      this.view.$lottoSwitch.checked = false;
      this.view.$winningResultModal.classList.remove('open');
    }
  }
}

export default WinningResultModalController;
