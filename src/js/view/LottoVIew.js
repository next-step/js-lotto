import { askQuestion, closeReadLine } from '../utils/console.js';

export default class LottoView {
  async inputPurchaseAmount() {
    const answer = await askQuestion('구입금액을 입력해 주세요.');
    return answer;
  }

  printPurchaseAmount(lottos) {
    console.log(`${lottos.length}개를 구매했습니다.\n`);
    lottos.forEach((lotto) => console.log(`[${lotto.numbers}]`));
    console.log('\n');
  }

  async inputWinningNumber() {
    const answer = await askQuestion('당첨 번호를 입력해 주세요.');
    console.log('\n');
    return answer;
  }

  async inputBonusNumber() {
    const answer = await askQuestion('보너스 번호를 입력해 주세요.');
    console.log('\n');
    return answer;
  }

  printLottoResult(winningLottoResult, totalReturn) {
    const { FIRST, SECOND, THIRD, FOURTH, FIFTH } = winningLottoResult;
    console.log('당첨 통계 \n');
    console.log('--------------------\n');
    console.log(`3개 일치 (5,000원) - ${FIRST.length}개`);
    console.log(`4개 일치 (50,000원) - ${SECOND.length}개`);
    console.log(`5개 일치 (1,500,000원) - ${THIRD.length}개`);
    console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${FOURTH.length}개`);
    console.log(`6개 일치 (2,000,000,000원) - ${FIFTH.length}개`);
    console.log(`총 수익률은 ${totalReturn}입니다.`);
    closeReadLine();
  }
}
