import { getReward } from "../src/getRank.js";
import { getLottoCountByRank } from "./lotto.js";
export const showLottoResult = (lottos, userInput, bonusNumber) => {
  for (let i = 5; i > 1; i--) {
    console.log(
      `${8 - i}개 일치(${getReward(i)}원) - ${getLottoCountByRank(
        i,
        lottos,
        userInput,
        bonusNumber
      )}개`
    );

    if (i === 3) {
      console.log(
        `5개 일치, 보너스 볼 일치(${getReward(2)}원) - ${getLottoCountByRank(
          2,
          lottos,
          userInput,
          bonusNumber
        )}개`
      );
    }

    if (i === 2) {
      console.log(
        `6개 일치(${getReward(1)}원) - ${getLottoCountByRank(
          1,
          lottos,
          userInput,
          bonusNumber
        )}개`
      );
    }
  }
};
