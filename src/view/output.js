/* eslint-disable class-methods-use-this */
class Output {
  printGetLottoTicket(ticket) {
    return ticket;
  }

  printResult() {
    return "당첨 통계 \n";
  }

  printDriven() {
    return "--------------------";
  }

  lottoStatisticsPrint(finalResult) {
    return `3개 일치 (5,000원) - ${finalResult.FIFTH}개 \n
4개 일치 (50,000원) - ${finalResult.FOURTH}개 \n
5개 일치 (1,500,000원) - ${finalResult.THIRD}개 \n
5개 일치, 보너스 볼 일치 (30,000,000원) - ${finalResult.SECOND}개 \n
6개 일치 (2,000,000,000원) - ${finalResult.FIRST}개`;
  }

  resultRoi(roi) {
    return `총 수익률은 ${roi}%입니다.`;
  }
}

export default Output;
