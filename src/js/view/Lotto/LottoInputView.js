import InputView from '../InputView.js';

class LottoInputView extends InputView {
  purchase() {
    return this._getUserInput('구입금액을 입력해 주세요.');
  }

  async winningNumbers() {
    const result = await this._getUserInput('당첨번호를 입력해주세요');
    return result.split(',').map((number) => Number(number.trim()));
  }

  async bonus() {
    const result = await this._getUserInput('보너스 번호를 입력해 주세요');
    return Number(result.trim());
  }
}

export default LottoInputView;
