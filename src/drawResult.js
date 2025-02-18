import { getReward } from "../src/getRank.js";
import Lotto, { buyLottos, calculateLottoTicketLimit } from "./lotto.js";
export const showLottoResult = (resultArr) => {
  for (let i = 3; i < 6; i++) {
    console.log(`${i}개 일치 (${getReward(8 - i)}원)- ${resultArr[7 - i]}개`);
  }
  console.log(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${resultArr[1]}개`);
  console.log(`6개 일치 (${getReward(1)}원)- ${resultArr[0]}개`);
};

export const showLottoNumbers = (lotto, amount) => {
  lotto = new Lotto(amount);
  const ticketCount = calculateLottoTicketLimit(amount);
  buyLottos(ticketCount, lotto);
  for (let i = 0; i < ticketCount; i++) {
    console.log(lotto.numbers[i]);
  }
};
