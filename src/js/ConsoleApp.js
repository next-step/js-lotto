import LottoMachine from './domain/LottoMachine';
import LottoCalculator from './domain/LottoCalculator';
import { comma, readLineAsync } from './utils';
import { convertLottoStringToLottoArray } from './utils/LottoUtil';
import { readLottoNumbers, readROI } from './view/LottoIO';

async function ConsoleApp() {
  const purchaseAmount = await readLineAsync('구입금액을 입력해 주세요. : ');
  const lottoTickets = LottoMachine.sellAutoLottoTicket(Number(purchaseAmount));

  console.log(`${lottoTickets.length}개를 구매했습니다.`);
  lottoTickets.forEach((lottoTicket) =>
    console.log(readLottoNumbers(lottoTicket))
  );

  const winningNumbers = await readLineAsync('당첨 번호를 입력해 주세요. : ');

  const bonusNumber = await readLineAsync('보너스 번호를 입력해 주세요. : ');

  const lottoCalculator = new LottoCalculator({
    winningNumbers: convertLottoStringToLottoArray(winningNumbers),
    winningBonusNumber: Number(bonusNumber),
  });

  const { profit, chart } = lottoCalculator.getStatistics(lottoTickets);

  console.log('당첨 통계\n--------------------');
  chart.forEach((row) => {
    const [rank, data] = row;
    const { matchCount, winningAmount, lottoTickets } = data;
    console.log(
      `${matchCount}개 일치 (${comma(winningAmount)}원) - ${lottoTickets.length}개`
    );
  });
  console.log(`총 수익률을 ${readROI(profit, Number(purchaseAmount))}입니다.`);
}

export default ConsoleApp;
