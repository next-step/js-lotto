import { $ } from '../../utils.js';
import Controller from '../controllers/controller.js';

class WinningInputForm extends Controller {
  constructor($target, model) {
    super($target, model);
    this.$inputLottoNumbers = $('#input-lotto-numbers');
  }

  render() {
    const { lottoCount } = this.model;
    if (lottoCount > 0) {
      this.$inputLottoNumbers.style.display = 'block';
      return;
    }
  }
}

export default WinningInputForm;
