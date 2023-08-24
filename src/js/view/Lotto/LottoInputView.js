import { LOTTO_RETRY_CODE } from '../../constants/lotto-config.js';
import InputView from '../InputView.js';

class LottoInputView extends InputView {
  purchase() {
    return this.input('구입금액을 입력해 주세요.');
  }

  retry() {
    return this.input(`다시 시작하시겠습니까? (${LOTTO_RETRY_CODE.CONFIRM}/${LOTTO_RETRY_CODE.REJECT})`);
  }

  winningNumbers() {
    return this.input('당첨번호를 입력해주세요');
  }

  bonus() {
    return this.input('보너스 번호를 입력해 주세요');
  }
}

export default LottoInputView;
