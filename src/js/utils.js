import { LOTTO } from "./constants.js";

export const getLottoRandomNumber = () => {
  return Math.floor(Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) + 1);
};

export const calculateEarningRates = (earnings, investments) =>
  Math.trunc(((earnings - investments) / investments) * 100);

const getCorrectCount = (lottoNumbers, winningNumbers) => {
  let count = 0;
  lottoNumbers.forEach((number) => {
    if (winningNumbers.includes(number)) {
      count++;
    }
  });

  return count;
};

export const getAnalytics = (lottoNumbers, winningNumbers) => {
  const result = [0, 0, 0, 0, 0, 0, 0, 0];

  lottoNumbers.forEach((lottoNumber) => {
    const correctCount = getCorrectCount(lottoNumber, winningNumbers);
    if (6 <= correctCount) {
      const lottoSixNumber = lottoNumber.slice(0, 6);
      const winningSixNumber = winningNumbers.slice(0, 6);

      // 6개 모두 동일
      if (getCorrectCount(lottoSixNumber, winningSixNumber) === 6) {
        result[result.length - 1] += 1;

        // 5개 + 보너스 동일
      } else if (lottoNumber.at(-1) === winningNumbers.at(-1)) {
        result[result.length - 2] += 1;

        // 5개 동일로 처리
      } else {
        result[result.length - 3] += 1;
      }
    } else {
      result[correctCount] += 1;
    }
  });

  return result.slice(3);
};
