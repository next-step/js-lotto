import LottoMachine from './domain/LottoMachine';
import { comma, readLineAsync } from './utils';
import { readLottoNumbers, readROI, writeLottoNumbers } from './view/LottoIO';

async function ConsoleApp() {
  const lottoMachine = new LottoMachine();

  const purchaseAmount = await readLineAsync('구입금액을 입력해 주세요. : ');
  const lottoTickets = lottoMachine.sellAutoLottoTicket(Number(purchaseAmount));

  console.log(`${lottoTickets.length}개를 구매했습니다.`);
  lottoTickets.forEach((lottoTicket) =>
    console.log(readLottoNumbers(lottoTicket))
  );

  const winningNumbers = await readLineAsync('당첨 번호를 입력해 주세요. : ');
  lottoMachine.winningNumbers = writeLottoNumbers(winningNumbers);

  const bonusNumber = await readLineAsync('보너스 번호를 입력해 주세요. : ');
  lottoMachine.bonusWinningNumber = Number(bonusNumber);

  const { netReturn, chart } = lottoMachine.getStatistics(lottoTickets);

  console.log('당첨 통계\n--------------------');
  chart.forEach((row) => {
    const [rank, data] = row;
    const { matchCount, winningAmount, lottoTickets } = data;
    console.log(
      `${matchCount}개 일치 (${comma(winningAmount)}원) - ${lottoTickets.length}개`
    );
  });
  console.log(
    `총 수익률을 ${readROI(netReturn, Number(purchaseAmount))}입니다.`
  );
}

export default ConsoleApp;
