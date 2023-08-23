import { LOTTO_RETRY_CODE } from '../../constants/lotto-config.js';
import splitToNumberArray from '../../utils/splitToNumberArray.js';
import InputView from '../InputView.js';

class LottoInputView extends InputView {
  async purchase() {
    const result = await this._getUserInput('구입금액을 입력해 주세요.');
    return Number(result.trim());
  }

  async retry() {
    return this._getUserInput(`다시 시작하시겠습니까? (${LOTTO_RETRY_CODE.CONFIRM}/${LOTTO_RETRY_CODE.REJECT})`);
  }

  async winningNumbers() {
    const result = await this._getUserInput('당첨번호를 입력해주세요');
    return splitToNumberArray(result);
  }

  async bonus() {
    const result = await this._getUserInput('보너스 번호를 입력해 주세요');
    return Number(result.trim());
  }
}

export default LottoInputView;
