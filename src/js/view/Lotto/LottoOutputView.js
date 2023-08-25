import OutputView from '../OutputView.js';

class LottoOutputView extends OutputView {
  buyLottos(quantity) {
    this.message(`${quantity}개를 구매했습니다.`);
  }

  lotto(numbers) {
    this.message(numbers);
  }

  prize({ match, hasBonus, prize, quantity }) {
    this.message(`${match}개 일치${hasBonus ? ', 보너스 볼 일치' : ''} (${prize.toLocaleString()}원) - ${quantity}개`);
  }

  divider() {
    this.message('--------------------');
  }

  lottoResult() {
    this.message('당첨 통계');
    this.divider();
  }

  rateOfReturn(tateOfReturn) {
    this.message(`총 수익률은 ${tateOfReturn.toLocaleString()}%입니다.`);
  }
}

export default LottoOutputView;
