import Lotto from "./js/lotto";
import { isNumber, readLineAsync } from "./js/util";

async function play() {
  const lottoInstance = new Lotto();

  const purchaseAmount = await readLineAsync("구입금액을 입력해 주세요.\n");

  const lottoQuantity = lottoInstance.getLottoQuantityByMoney(purchaseAmount);
  console.log(`${lottoQuantity}개를 구매했습니다.\n`);

  const lottos = Array(lottoQuantity)
    .fill()
    .map(() => {
      const lottoNumber = lottoInstance.getLottoNumber();
      return lottoNumber;
    });
  lottoInstance.setLottos(lottos);

  const winningNumberString = await readLineAsync(
    "당첨 번호를 입력해 주세요.\n"
  );
  const winningNumberArray = lottoInstance
    .getWinningNumberByString(winningNumberString)
    .map((winningNumber) => Number(winningNumber));

  lottoInstance.setWinningNumber(winningNumberArray);

  const bonusNumber = await readLineAsync("보너스 번호를 입력해 주세요.\n");

  if (!isNumber(bonusNumber)) {
    throw new Error();
  }

  lottoInstance.setBounsNumber(bonusNumber);

  const rankCount = lottoInstance.getRankCount();
  const profit = Object.keys(rankCount)
    .reverse()
    .reduce((acc, keys) => {
      console.log(
        `${lottoInstance.getDisplayStringByRankCount(keys)} (${
          lottoInstance.getRewardByRank(keys).reward
        }) - ${rankCount[keys]}개`
      );

      acc += rankCount[keys] * lottoInstance.getRewardByRank(keys).reward;
      return acc;
    }, 0);

  const profitRage = lottoInstance.getProfitRate(purchaseAmount, profit);
  console.log(`총 수익률은 ${profitRage}%입니다.`);
}

play();
