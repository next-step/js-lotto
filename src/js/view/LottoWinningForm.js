import { VIEW_CONDITION } from '../constants.js';

class LottoWinningForm {
  constructor(lottoWinningNumberForm) {
    this.lottoWinningNumberForm = lottoWinningNumberForm;
  }

  showForm() {
    this.lottoWinningNumberForm.classList.add(VIEW_CONDITION);
  }

  hiddenForm() {
    this.lottoWinningNumberForm.classList.remove(VIEW_CONDITION);
  }

  resetForm() {
    this.lottoWinningNumberForm.reset();
  }
}

export default LottoWinningForm;
