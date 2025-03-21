class LottoResult {
  static prizeMapping = new Map([
    [5000, "match-3"],
    [50000, "match-4"],
    [1500000, "match-5"],
    [30000000, "match-5b"],
    [2000000000, "match-6"],
  ]);

  constructor() {
    this.modal = document.getElementById("resultModal");
    this.closeButton = document.querySelector(".close-button");
    this.closeButton.addEventListener("click", () => this.closeModal());
  }

  render(statistics, profit) {
    for (const [prize, count] of statistics.entries()) {
      const matchedElement = LottoResult.prizeMapping.get(prize.prizeAmount);
      this.showMatchedCount(matchedElement, count);
    }

    document.getElementById("profit-rate").textContent =
      `당신의 총 수익률은 ${profit}%입니다.`;

    this.modal.showModal();
  }

  showMatchedCount(matchedElement, count) {
    if (matchedElement) {
      document.getElementById(matchedElement).textContent = `${count}개`;
    }
  }

  closeModal() {
    this.modal.close();
  }
}

export default LottoResult;
