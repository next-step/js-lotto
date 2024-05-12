import { OUTPUT_MESSAGE } from "../../constants/message";

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
      switch (key) {
        case 1:
          console.log(OUTPUT_MESSAGE.FIRST_PRIZE(value));
          break;
        case 2:
          console.log(OUTPUT_MESSAGE.SECOND_PRIZE(value));
          break;
        case 3:
          console.log(OUTPUT_MESSAGE.THIRD_PRIZE(value));
          break;
        case 4:
          console.log(OUTPUT_MESSAGE.FOURTH_PRIZE(value));
          break;
        case 5:
          console.log(OUTPUT_MESSAGE.FIFTH_PRIZE(value));
          break;
        default:
          break;
      }
    });
  },

  rateOfReturn(count) {
    console.log(OUTPUT_MESSAGE.TOTAL_RATE_OF_RETURN(count));
  },
};
