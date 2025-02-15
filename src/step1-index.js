import { readLineAsync } from '../libs/readline.js';
import { getLotto } from './domains/common/utils.js';
import {
  LOTTO_JACKPOT_PRICES,
  LOTTO_JACKPOT_RANK_RULES,
} from './domains/jackpot/constant.js';
import { getJackpotResult } from './domains/jackpot/utils.js';
import { calculateLottoCount } from './domains/order/utils.js';
import { getProfitRate } from './domains/statistics/utils.js';
import { commaizeNumber } from './utils/index.js';

const RANK_KEYS = ['FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH'];

const main = async () => {
  const inputAmount = await readLineAsync('> 구입금액을 입력해 주세요.');

  const amount = Number(inputAmount);
  const count = calculateLottoCount(amount);
  console.log(`${count}개를 구매했습니다.`);

  const userLottos = Array.from({ length: count }, () => {
    const lotto = getLotto();
    console.log(lotto);

    return lotto;
  });

  console.log();

  const inputJackpot = await readLineAsync('> 당첨 번호를 입력해 주세요. ');
  console.log();

  const inputBonusNumber = await readLineAsync(
    '> 보너스 번호를 입력해 주세요. ',
  );
  console.log();

  const jackpotNumbers = inputJackpot.split(',').map((value) => Number(value));
  const bonusNumber = Number(inputBonusNumber);

  const lottoResults = userLottos.map((orderedLotto) =>
    getJackpotResult(
      { ordered: orderedLotto, jackpot: jackpotNumbers },
      bonusNumber,
    ),
  );

  console.log('당첨 통계');
  console.log('--------------------');

  const totalJackpotAmount = RANK_KEYS.reverse().reduce(
    (totalAmount, key, index) => {
      const currentRank = RANK_KEYS.length - index;
      const { count, amount } = lottoResults.reduce(
        (results, { rank, price }) =>
          rank === currentRank
            ? { count: results.count + 1, amount: results.amount + price }
            : results,
        { count: 0, amount: 0 },
      );

      if (key === 'SECOND') {
        console.log(
          `${LOTTO_JACKPOT_RANK_RULES[key]}개 일치, 보너스 볼 일치 (${commaizeNumber(LOTTO_JACKPOT_PRICES[key])}원) - ${count}개`,
        );
        return (totalAmount += count * amount);
      }

      console.log(
        `${LOTTO_JACKPOT_RANK_RULES[key]}개 일치 (${commaizeNumber(LOTTO_JACKPOT_PRICES[key])}원) - ${count}개`,
      );

      return (totalAmount += count * amount);
    },
    0,
  );

  const profitRate = getProfitRate(amount, totalJackpotAmount);

  console.log(`총 수익률은 ${profitRate}%입니다.`);
};

main();
