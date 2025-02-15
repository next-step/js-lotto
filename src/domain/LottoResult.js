class LottoResult {
  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;
  }

  compareNumber(tickets) {
    return tickets.map((ticket) => {
      const matchedNumbers = ticket.filter((item) =>
        this.winningNumbers.includes(item)
      );
      const hasBonus = ticket.includes(this.bonusNumber);
      return { ticket, matchedNumbers, hasBonus };
    });
  }

  getWinnersNumber() {
    return {
      winningNumbers: this.winningNumbers,
      bonusNumber: this.bonusNumber,
    };
  }
}

export default LottoResult;
