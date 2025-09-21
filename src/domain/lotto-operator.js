import { Factory } from "../factory/factory.js";

import { LottoWinnerNumber } from './lotto-winner-number.js';
import { LottoWinningStat } from './lotto-winning-stat.js';

// 로또 사업자
export class LottoOperator {
    #publishedLottos = new Array();

    Publish(count) {
        const results = Array();
        for (let i = 0; i < count; i++) {
            const lotto = Factory.Create();

            this.#publishedLottos.push(lotto);

            results.push(lotto);
        }
        return results;
    }

    async DrawWinningNumbers(readline) {
        const expectedWinningNumbers = (await readline.question('> 당첨 번호를 입력해 주세요. ')).split(',').map(s => Number(s));
        const bonusNumber = Number(await readline.question('> 보너스 번호를 입력해 주세요. '));

        return new LottoWinnerNumber(expectedWinningNumbers, bonusNumber);
    }

    CalculateLottoWinningStat(lottos, lottoWinnerNumber) {
        const lottoWinningStat = new LottoWinningStat();
        for (const lotto of lottos) {
            const matchedCount = lottoWinnerNumber.MatchedCount(lotto);
            const bonusNumberMatched = lotto.Contains(lottoWinnerNumber.bonusNumber);
            lottoWinningStat.Add(matchedCount, bonusNumberMatched);
        }

        return lottoWinningStat;
    }
}
