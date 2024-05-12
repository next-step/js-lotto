import LottoMachine from './domain/LottoMachine';
import { generateRamdomNumbers } from './utils';
import LottoIO from './view/\bLottoIO';

/**
 * step 1의 시작점이 되는 파일입니다.
 * 브라우저 환경에서 사용하는 css 파일 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
console.log('Hello, World!');

async function main() {
  const lottoIO = new LottoIO();
  const machine = new LottoMachine();

  //when
  const prices = await lottoIO.inputPurchasePrice();
  const lottos = machine.createLottos(prices);

  console.log(`${lottos.length}개 구매했습니다.`);
  lottos.forEach((lotto) => {
    console.log(lotto.numbers);
  });

  const winningNumbers = await lottoIO.inputWinningNumbers();
  const bonusNumber = await lottoIO.inputBonusNumber();

  console.log('winningNumbers', winningNumbers);
  console.log('bonusNumber', bonusNumber);

  machine.winnigNumbers = winningNumbers;
  machine.bonusNumber = bonusNumber;

  const checkedLottos = machine.checkLottoWinning(lottos);
  lottoIO.outputPurchasedLottos(checkedLottos);

  const percent = machine.returnsLottos(prices, checkedLottos);
}

main();
