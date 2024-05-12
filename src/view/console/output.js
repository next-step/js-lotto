import { OUTPUT_MESSAGE, PRIZE_MESSAGE } from "../../constants/message";

export const output = {
  lottosCount(count) {
    console.log(OUTPUT_MESSAGE.PURCHASE_RESULT_COUNT(count));
  },

  lottos(lottos) {
    lottos.map((lotto) => console.log(lotto));
  },

  result(result) {
    const resultArray = [...result.entries()].reverse();

    console.log(OUTPUT_MESSAGE.WINNING_STATISTICS);
    resultArray.forEach(([key, value]) => {
      const message = PRIZE_MESSAGE[key];
      if (message) {
        console.log(message(value));
      }
    });
  },

  rateOfReturn(count) {
    console.log(OUTPUT_MESSAGE.TOTAL_RATE_OF_RETURN(count));
  },
};
