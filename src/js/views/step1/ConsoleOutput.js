class ConsoleOutput {
  printWinningStatistics({ earns, winningCriteria }) {
    console.log("\n당첨 통계\n--------------------");
    this.printMatches(winningCriteria);
    console.log(`총 수익률은 ${earns}% 입니다.`);
  }

  printMatches(winningCriteria) {
    winningCriteria.forEach((criteria) => {
      console.log(
        `${criteria.winningCount}개 일치${criteria.hasToWinBonus ? ", 보너스 볼 일치" : ""} (${
          criteria.winningAmount
        }원) - ${criteria.numOfWinTicket}개`
      );
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
