import { LANK, LOTTO_NUMBER, PRIZE } from '../utils/consts.js';
import Validate from './Validate.js';

const Lotto = (function () {
  let automaticLottoTickets;

  return {
    price: {
      isNotCorrectPriceRange(value) {
        return Validate.checkPriceRange(value);
      },

      isNotCorrectPriceUnit(value) {
        return Validate.checkPriceUnit(value);
      },
    },

    automaticNumber: {
      getRandomNumber(amount) {
        const randomNumberList = Array.from({ length: amount }).map((_) => {
          const numbers = Array(LOTTO_NUMBER.MAX)
            .fill(LOTTO_NUMBER.MIN)
            .map((v, k) => v + k);
          const lottoNumbers = numbers
            .slice()
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);
          return lottoNumbers;
        });
        automaticLottoTickets = randomNumberList;
        return randomNumberList;
      },
    },

    winningNumber: {
      isNumberOverRange(numbers) {
        return Validate.checkWinningNumberRange(numbers);
      },

      isDuplicate(numbers) {
        return Validate.checkWinningNumberDuplicate(numbers);
      },

      checkWinningState(winningNumbers, bonusNumber) {
        const lottoNumberState = {
          winningNumbers,
          bonusNumber,
        };

        // MEMO: 각 로또별 랭크
        const eachRank = Array.from({
          length: automaticLottoTickets.length,
        }).map((_, index) =>
          this.formatterLank(automaticLottoTickets[index], lottoNumberState)
        );

        // MEMO: 각각 등수별 당첨 갯수
        const totalRank = eachRank.reduce((prev, curr) => {
          prev.set(curr, (prev.get(curr) || 0) + 1);
          return prev;
        }, new Map());

        // MEMO: 총 수익 상금
        const totalPrize = [...totalRank.keys()].reduce(
          (sum, rank) => sum + totalRank.get(rank) * PRIZE[rank],
          0
        );

        return {
          totalRank,
          totalPrize,
        };
      },

      formatterLank(aLotto, { winningNumbers, bonusNumber }) {
        const correctWinningNumberCount = aLotto.filter((lottoNumber) =>
          winningNumbers.includes(lottoNumber)
        ).length;

        switch (correctWinningNumberCount) {
          case 3:
            return LANK.FIFTH;
          case 4:
            return LANK.FOUTRH;
          case 5:
            return aLotto.includes(bonusNumber) ? LANK.SECOND : LANK.THIRD;
          case 6:
            return LANK.FIRST;
          default:
            return LANK.REST;
        }
      },
    },
  };
})();

export default Lotto;
