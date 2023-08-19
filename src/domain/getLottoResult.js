import {LottoPrize} from '.';

export const getLottoResult = ({lotteries, winningNumbers, bonusNumber}) => {
  const lottoPrize = new LottoPrize({winningNumbers, bonusNumber});
  const lottoResult = lotteries.reduce(
    (acc, lottery) => {
      const prize = lottoPrize.getLottoPrize(lottery);
      acc[prize] += 1;
      return acc;
    },
    {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
      LOSS: 0,
    },
  );

  return lottoResult;
};
