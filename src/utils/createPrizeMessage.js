import { PRIZE_STATISTICS } from "../constants/message";

export const createPrizeMessage = (prize, count) => {
  const { equalCount, price } = PRIZE_STATISTICS[prize];
  const bonusText = prize === 2 ? ", 보너스 일치" : "";
  return `${equalCount}개 일치${bonusText} (${price}원) - ${count}개`;
};
