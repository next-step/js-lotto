import { getSelector, isRangeNumberInLotto } from '../utils/index.js';
import { getLottoListTemplate, getCount, createLottoList } from '../domains/index.js';
import { validatePrice, errorPrintAlert } from '../domains/errors.js';
import App from '../app.js';

class LottoWinningForm extends App {
  _init() {
    getSelector('#form-winning').addEventListener('submit', this.result.bind(this));
    getSelector('#winning-input').addEventListener('input', this.changeInput.bind(this));
  }

  result(e) {
    e.preventDefault();
    let winningNumber = [];
    e.target['winning-number'].forEach(($number) => winningNumber.push($number.value));

    this.setState({ winningNumber });
  }

  changeInput(e) {
    const value = e.target.value;
    const $winningBonusInput = getSelector('input[name="winning-bonus-number"]');
    if (!isRangeNumberInLotto(Number(value))) {
      e.target.value = value.substr(0, value.length - 1);
    }
    if (value.length > 1) {
      e.target.nextElementSibling ? e.target.nextElementSibling.focus() : $winningBonusInput.focus();
    }
  }

  render() {}
}

export default LottoWinningForm;
