import LottoMachine from './domain/LottoMachine';
import LottoCalculator from './domain/LottoCalculator';
import { readLottoNumbers, readROI } from './view/LottoIO';
import { comma, prompt } from './utils';
import ThrowMessage from './utils/ThrowMessage';
import LottoThrowMessage from './utils/LottoThrowMessage';
import { convertLottoStringToLottoArray } from './utils/LottoUtil';
import { LOTTO } from './constants';

async function ConsoleApp() {
  try {
    const purchaseAmount = await prompt('구입금액을 입력해 주세요. : ', {
      format: Number,
      validate: validatePurchaseAmount,
    });

    const lottoTickets = LottoMachine.sellAutoLottoTicket(
      Number(purchaseAmount)
    );

    console.log(`${lottoTickets.length}개를 구매했습니다.`);
    lottoTickets.forEach((lottoTicket) => {
      console.log(readLottoNumbers(lottoTicket));
    });

    const winningNumbers = await prompt('당첨 번호를 입력해 주세요. : ', {
      format: convertLottoStringToLottoArray,
      validate: validateWinningNumbers,
    });

    const winningBonusNumber = await prompt('보너스 번호를 입력해 주세요. : ', {
      format: Number,
      validate: (value) => validateWinningBonusNumber(value, winningNumbers),
    });

    const lottoCalculator = new LottoCalculator({
      winningNumbers,
      winningBonusNumber,
    });

    const { profit, chart } = lottoCalculator.getStatistics(lottoTickets);

    console.log('당첨 통계\n--------------------');
    chart.forEach((row) => {
      const { matchCount, winningAmount, lottoTickets } = row;
      console.log(
        `${matchCount}개 일치 (${comma(winningAmount)}원) - ${lottoTickets.length}개`
      );
    });
    console.log(
      `총 수익률을 ${readROI(profit, Number(purchaseAmount))}입니다.`
    );

    const cmd = await prompt('다시 시작하시겠습니까? (y/n) : ', {
      validate: validateRetryCmd,
    });
    if (['y', 'Y'].includes(cmd)) {
      await ConsoleApp();
    }
  } catch (e) {
    console.log(`예기치 못한 오류로 인하여 종료되었습니다.`);
  }
}

function validatePurchaseAmount(cost) {
  new ThrowMessage(cost)
    .maxSafeInteger()
    .integer()
    .callback((value) => {
      if (value < LOTTO.PRICE) {
        throw new Error("'돈이 부족합니다.'");
      }
    });
}

function validateWinningNumbers(lottoNumbers) {
  new LottoThrowMessage(lottoNumbers).isLottoNumberArray();
}

function validateWinningBonusNumber(winningBonusNumber, winningNumbers) {
  new LottoThrowMessage(winningBonusNumber)
    .isLottoNumber()
    .checkDuplicateLottoNumbers(winningNumbers);
}

function validateRetryCmd(input) {
  new ThrowMessage(input).matchRegex(
    /^[yYnN]$/,
    `\n- [y|Y] : 로또 게임 재시작\n- [n|N] : 로또 게임 종료\n`
  );
}

export default ConsoleApp;
