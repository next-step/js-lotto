import { RETRY_INPUT_COUNT } from './constants';
import LottoConfirm from './domain/LottoConfirm';
import LottoMachine from './domain/LottoMachine';
import { sortArray } from './utils';
import LottoIO from './view/LottoIO';

/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
console.log('Hello, World!');

async function main() {
  try {
    let isRepeat = true;
    while (isRepeat === true) {
      const lottoIO = new LottoIO();
      const machine = new LottoMachine();
      const lottoConfirm = new LottoConfirm();

      //when
      const prices = await lottoIO.inputPurchasePrice(RETRY_INPUT_COUNT);
      const lottos = machine.createLottos(prices, 'ASC', sortArray);

      console.log(`${lottos.length}개 구매했습니다.`);
      lottos.forEach((lotto) => {
        console.log(lotto);
      });

      const winningNumbers = await lottoIO.inputWinningNumbers(RETRY_INPUT_COUNT);
      const bonusNumber = await lottoIO.inputBonusNumber(RETRY_INPUT_COUNT);

      console.log('winningNumbers', winningNumbers);
      console.log('bonusNumber', bonusNumber);

      lottoConfirm.setWinningNumbers(winningNumbers);
      lottoConfirm.setBonusNumber(winningNumbers);

      const checkedLottos = lottoConfirm.checkLottoWinning(lottos);
      lottoIO.outputPurchasedLottos(checkedLottos);

      const percent = lottoConfirm.returnsLottos(prices, checkedLottos);

      lottoIO.outputLottosResult(checkedLottos, percent);

      const restart = await lottoIO.inputRestartOrNot(RETRY_INPUT_COUNT);

      if (restart === 'no' || restart === 'n') {
        isRepeat = false;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

main();
