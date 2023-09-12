import { MATCH_MESSAGE } from "../../constants.js";

class ConsoleOutput {
  printWinningStatistics({ earns, winningCriteria, lottoTickets }) {
    console.log("\n당첨 통계\n--------------------");
    this.printMatches(winningCriteria, lottoTickets);
    console.log(`총 수익률은 ${earns}% 입니다.`);
  }

  printMatches(winningCriteria, lottoTickets) {
    const countOfWins = new Array(5).fill(0);
    lottoTickets.forEach((lottoTicket) => {
      let placeIdx = lottoTicket.getPlaceIdx();
      if (placeIdx !== null) countOfWins[placeIdx]++;
    });

    winningCriteria.forEach((criteria, idx) => {
      console.log(MATCH_MESSAGE(criteria, countOfWins[idx]));
    });
  }

  printLottoTickets(lottoTickets) {
    console.log(`${lottoTickets.length}개를 구매했습니다.`);

    lottoTickets.forEach((lottoTicket) => {
      console.log(lottoTicket.getLottoNumbers());
    });
  }
}

export default ConsoleOutput;
