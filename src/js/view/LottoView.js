import View from './View.js';

class LottoView extends View {
  purchase() {
    return this.getUserInput('구입금액을 입력해 주세요.');
  }
}

export default LottoView;
