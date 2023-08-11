import View from './View.js';

class LottoView extends View {
  purchase() {
    return this.getUserInput('구입금액을 입력해 주세요.');
  }

  async winningNumbers() {
    const result = await this.getUserInput('당첨번호를 입력해주세요');
    return result.split(',').map((number) => Number(number.trim()));
  }
}

export default LottoView;
