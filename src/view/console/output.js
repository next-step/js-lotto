import { OUTPUT_MESSAGE } from "../../constants/message";
import { createPrizeMessage } from "../../utils/createPrizeMessage";

export const output = {
  lottosCount(count) {
    console.log(OUTPUT_MESSAGE.PURCHASE_RESULT_COUNT(count));
  },

  lottos(lottos) {
    lottos.map((lotto) => console.log(lotto));
  },

  result(result) {
    try {
      if ((!result) instanceof Map) {
        throw new Error(OUTPUT_MESSAGE.RESULT_TYPE_ERROR);
      }
      const resultArray = [...result.entries()].reverse();

      console.log(OUTPUT_MESSAGE.WINNING_STATISTICS);
      resultArray.forEach(([prize, count]) => {
        console.log(createPrizeMessage(prize, count));
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  rateOfReturn(count) {
    console.log(OUTPUT_MESSAGE.TOTAL_RATE_OF_RETURN(count));
  },
};
