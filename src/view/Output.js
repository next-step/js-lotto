import { RESULT_TEXT } from "../utils/constants.js";

class Output {
  printDrawResult(result) {
    console.log("당첨 통계");
    console.log("--------------------");

    this.printResultTextMessage(result);

    this.printRateOfReturn(result.rateOfReturn);
  }

  printResultTextMessage(result) {
    Object.entries(result.counts).forEach(([matchedCount, count]) => {
      const resultText = RESULT_TEXT[matchedCount];
      console.log(`${resultText}- ${count}개`);
    });
  }

  printRateOfReturn(rate) {
    console.log(`총 수익률은 ${rate}%입니다.`);
  }

  printErrorMessage(error) {
    console.error(error);
  }
}

export default Output;
