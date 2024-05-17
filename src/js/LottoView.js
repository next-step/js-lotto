import { LOTTO_PRICE, calculateProfitRate } from "./domain/LottoService";
import { LottoRank } from "./domain/enum/LottoRank";
import { readLine } from "./util/ReadLine";

export const askMoney = async () => {
  const query = "> 구입금액을 입력해 주세요.";
  const transform = (x) => parseInt(x);

  const input = await readLine({ query, transform });
  return input;
};

export const printBuyingList = (numbersList) => {
  console.log(`${numbersList.length}개를 구매했습니다.`);
  numbersList.forEach((e) => console.log(e));
  console.log("");
};

export const askWinningNumbers = async () => {
  const query = "> 당첨 번호를 입력해 주세요.";
  const transform = (x) => x.split(",").map((e) => parseInt(e));
  const input = await readLine({ query, transform });
  return input;
};

export const askBonusNumber = async () => {
  const query = "> 보너스 번호를 입력해 주세요.";
  const transform = (x) => parseInt(x);
  const input = await readLine({ query, transform });
  return input;
};

export const printStats = (stats) => {
  const { rankCount, totalCount, totalReward } = stats;

  const statsView = `
  당첨 통계
  --------------------
  3개 일치 (5,000원) - ${rankCount.get(LottoRank.FIFTH.rank) ?? 0}개
  4개 일치 (50,000원) - ${rankCount.get(LottoRank.FOURTH.rank) ?? 0}개
  5개 일치 (1,500,000원) - ${rankCount.get(LottoRank.THIRD.rank) ?? 0}개
  5개 일치, 보너스 볼 일치 (30,000,000원) - ${
    rankCount.get(LottoRank.SECOND.rank) ?? 0
  }개
  6개 일치 (2,000,000,000원) - ${rankCount.get(LottoRank.FIRST.rank) ?? 0}개
  총 수익률은 ${calculateProfitRate(totalCount, totalReward)}%입니다.`;
  console.log(statsView);
};
