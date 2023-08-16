import { LOTTO_REWARD } from '../../constants/lotto-config.js';
import OutputView from '../OutputView.js';

class LottoOutputView extends OutputView {
  buyLottos(lottos) {
    this._message(`${lottos.length}개를 구매했습니다.`);
  }

  lottos(lottos) {
    lottos.forEach((lotto) => {
      this._message(lotto.numbers);
    });
  }

  prize({ code, quantity, hasBonus }) {
    const { matchedCount, prize } = LOTTO_REWARD[code];
    this._message(
      `${matchedCount}개 일치${hasBonus ? ', 보너스 볼 일치' : ''} (${prize.toLocaleString()}원) - ${quantity}개`
    );
  }

  lottoResult(result) {
    this._message('당첨 통계');
    this._message('--------------------');
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
