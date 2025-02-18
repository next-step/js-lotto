import { getReward } from "../src/getRank.js";

export const showLottoResult = (resultArr) => {
  for (let i = 3; i < 6; i++) {
    console.log(`${i}개 일치 (${getReward(8 - i)}원)- ${resultArr[7 - i]}개`);
  }
  console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${resultArr[1]}개`);
  console.log(`6개 일치 (${getReward(1)}원)- ${resultArr[0]}개`);
};
