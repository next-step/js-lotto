import LottoMachine from './domain/LottoMachine';
import { readLineAsync } from './utils';
import {
  readLottoNumbers,
  readMatchLottoNumber,
  readROI,
  writeLottoNumbers,
} from './view/LottoIO';

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

  console.log('당첨 통계\n--------------------');
  const { chart, netReturn } = lottoMachine.getLottoResult(lottoTickets);

  for (const [key, value] of chart.entries()) {
    if (key !== '-1') {
      console.log(
        readMatchLottoNumber({
          matchNumber: key,
          price: value.price,
          matchCount: value.count,
        })
      );
    }
  }
  console.log(
    `총 수익률을 ${readROI(netReturn, Number(purchaseAmount))}입니다.`
  );
}

export default ConsoleApp;
