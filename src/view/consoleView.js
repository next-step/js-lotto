import { readLineAsync as prompt } from "../utils/readLineAsync";

const askHowMuchToBuy = () => {
  return prompt("> 구입금액을 입력해 주세요. ");
};

const viewHowManyLottoBought = (howManyBought) => {
  console.log(`${howManyBought}개를 구입하셨습니다.`);
};

const viewPrintedLottoNumbers = (lotto) => {
  console.log(lotto.numbers);
};

const askWinningNumbers = () => {
  return prompt("> 당첨 번호를 입력해 주세요. ");
};

const askBonusNumber = () => {
  return prompt("> 보너스 번호를 입력해 주세요. ");
};

const viewResult = (prizeInfo, winningDataPerRank) => {
  console.log("당첨 통계");
  console.log("---------");

  prizeInfo.forEach((prize) => {
    const winningCount = winningDataPerRank[prize.rank]?.winningCount ?? 0;

    console.log(
      `${prize.matchingNumberCount}개 일치${
        prize.bonusAffectsWinning ? ", 보너스 볼 일치" : ""
      } (${Number(prize.reward).toLocaleString()}원) - ${winningCount}개`
    );
  });
};

const viewTotalRate = ({ lottoPrice, buyingAmount, totalRewards }) => {
  const totalRate = (totalRewards / (lottoPrice * buyingAmount)) * 100;
  console.log(`총 수익률은 ${totalRate}%입니다.`);
};

const viewError = (message) => {
  console.error(message);
};

export default {
  askHowMuchToBuy,
  viewHowManyLottoBought,
  viewPrintedLottoNumbers,
  askWinningNumbers,
  askBonusNumber,
  viewResult,
  viewTotalRate,
  viewError,
};
