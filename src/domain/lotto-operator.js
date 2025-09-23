import { Lotto } from './lotto.js';
import { LottoWinnerNumber } from './lotto-winner-number.js';
import { LottoWinningStat } from './lotto-winning-stat.js';

// 로또 사업자
export class LottoOperator {

    publish(count) {
        const results = Array();
        for (let i = 0; i < count; i++) {
            const lotto = this.#createLotto();

            results.push(lotto);
        }
        return results;
    }

    async createWinningNumber(winnerNumber, bonusNumber) {
        return new LottoWinnerNumber(winnerNumber, bonusNumber);
    }

    calculateLottoWinningStat(lottos, lottoWinnerNumber) {
        const lottoWinningStat = new LottoWinningStat();
        for (const lotto of lottos) {
            const matchedCount = this.#caculateMatchedCount(lotto.expectedNumbers, lottoWinnerNumber.numbers);
            const bonusNumberMatched = lotto.expectedNumbers.includes(lottoWinnerNumber.bonusNumber)
            lottoWinningStat.add(matchedCount, bonusNumberMatched);
        }

        return lottoWinningStat;
    }

    #createLotto() {
        const min = 1;
        const max = 99;
        const numbers = this.#generateRandomLottoNumber(6, min, max);
        return new Lotto(numbers);
    }

    #generateRandomLottoNumber(count, min, max) {
        const numbers = Array(count);
        for (let i = 0; i < count; i++) {
            const number = Math.ceil(Math.random() * (max - min)) + min;
            numbers.push(number);
        }

        return numbers;
    }

    #caculateMatchedCount(expectedNumbers, winningNumbers) {
        let result = 0;
        let eIdx = 0;
        let wIdx = 0;
        while (eIdx < expectedNumbers.length && wIdx < winningNumbers.length) {
            const expectedNumber = expectedNumbers[eIdx];
            const winningNumber = winningNumbers[wIdx];
            if (expectedNumber === winningNumber) {
                result++;
                eIdx++;
                wIdx++;
            } else if (expectedNumber > winningNumbers) {
                wIdx++;
            } else {
                eIdx++;
            }
        }
        return result;
    }
}
