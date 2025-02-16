import { getReward } from "../src/getRank.js";

export const showLottoResult = (lotto) => {
  for (let i = 3; i < 6; i++) {
    console.log(
      `${i}개 일치 (${getReward(8 - i)}원)- ${lotto.result[8 - i]}개`
    );
  }
  console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${lotto.result[2]}개`);
  console.log(`6개 일치 (${getReward(1)}원)- ${lotto.result[1]}개`);
};
