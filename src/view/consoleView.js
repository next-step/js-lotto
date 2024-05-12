import { MESSAGE } from "../constant";
import { readLineAsync as prompt } from "../utils/readLineAsync";

const askHowMuchToBuy = () => {
  return prompt(MESSAGE.PROMPT.BUY_AMOUNT);
};

const viewHowManyLottoBought = (howManyBought) => {
  console.log(MESSAGE.OUTPUT.HOW_MANY_BOUGHT(howManyBought));
};

const viewPrintedLottoNumbers = (lotto) => {
  console.log(lotto.numbers);
};

const askWinningNumbers = () => {
  return prompt(MESSAGE.PROMPT.WINNING_NUMBERS);
};

const askBonusNumber = () => {
  return prompt(MESSAGE.PROMPT.BONUS_NUMBER);
};

const viewResult = (prizeInfo, winningDataPerRank) => {
  console.log(MESSAGE.OUTPUT.WINNING_STATICS);
  console.log("---------");

  prizeInfo.forEach((prize) => {
    const winningCount = winningDataPerRank[prize.rank]?.winningCount ?? 0;

    console.log(MESSAGE.OUTPUT.RESULT_PER_RANK(prize, winningCount));
  });
};

const viewTotalRate = ({ lottoPrice, buyingAmount, totalRewards }) => {
  const totalRate = (totalRewards / (lottoPrice * buyingAmount)) * 100;
  console.log(MESSAGE.OUTPUT.TOTAL_RATE(totalRate.toFixed(2)));
};

export default {
  askHowMuchToBuy,
  viewHowManyLottoBought,
  viewPrintedLottoNumbers,
  askWinningNumbers,
  askBonusNumber,
  viewResult,
  viewTotalRate,
};
