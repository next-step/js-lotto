import { LOTTO_REWARD } from '../../constants/lotto-config.js';
import OutputView from '../OutputView.js';

class LottoOutputView extends OutputView {
  buyLottos(lottos) {
    this._message(`${lottos.length}개를 구매했습니다.`);
  }

  lotto(numbers) {
    this._message(numbers);
  }

  prize({ match, hasBonus, prize, quantity }) {
    this._message(`${match}개 일치${hasBonus ? ', 보너스 볼 일치' : ''} (${prize.toLocaleString()}원) - ${quantity}개`);
  }

  divider() {
    this._message('--------------------');
  }

  lottoResult(result) {
    this._message('당첨 통계');
    this.divider();
    Object.keys(result).forEach((code) => {
      const quantity = result[code];
      const { hasBonus } = LOTTO_REWARD[code];
      this.prize({ code, quantity, hasBonus });
    });
  }

  rateOfReturn(tateOfReturn) {
    this._message(`총 수익률은 ${tateOfReturn.toLocaleString()}%입니다.`);
  }

  error(err) {
    this._error(err);
  }
}

export default LottoOutputView;
