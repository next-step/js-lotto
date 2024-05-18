import { OUTPUT_MESSAGE, PRIZE_MESSAGE } from "../../constants/message";

export const output = {
  lottosCount(count) {
    console.log(OUTPUT_MESSAGE.PURCHASE_RESULT_COUNT(count));
  },

  lottos(lottos) {
    lottos.map((lotto) => console.log(lotto));
  },

  result(result) {
    try {
      if (!result instanceof Map) {
        throw new Error(OUTPUT_MESSAGE.RESULT_TYPE_ERROR);
      }
      const resultArray = [...result.entries()].reverse();

      console.log(OUTPUT_MESSAGE.WINNING_STATISTICS);
      resultArray.forEach(([key, value]) => {
        switch (key) {
          case 1:
            console.log(PRIZE_MESSAGE.FIRST_PRIZE(value));
            break;
          case 2:
            console.log(PRIZE_MESSAGE.SECOND_PRIZE(value));
            break;
          case 3:
            console.log(PRIZE_MESSAGE.THIRD_PRIZE(value));
            break;
          case 4:
            console.log(PRIZE_MESSAGE.FOURTH_PRIZE(value));
            break;
          case 5:
            console.log(PRIZE_MESSAGE.FIFTH_PRIZE(value));
            break;
          default:
            break;
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  rateOfReturn(count) {
    console.log(OUTPUT_MESSAGE.TOTAL_RATE_OF_RETURN(count));
  },
};
