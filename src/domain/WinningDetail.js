import Lotto from "./Lotto.js";
import PurchaseHistory from "./PurchaseHistory.js";

class WinningDetail {
  #winner;

  // 객체를 주입받아서 사용한다.
  constructor({ purchaseHistory, lotto }) {
    if ((!purchaseHistory) instanceof PurchaseHistory) {
      throw new Error("당첨 내역을 출력할 수 없어요.");
    }
    if ((!lotto) instanceof Lotto) {
      throw new Error("당첨 내역을 출력할 수 없어요.");
    }
    this.#setWinner(purchaseHistory, lotto);
  }

  #setWinner(purchaseHistory, lotto) {
    const winningDetailNumber = lotto.getWinningNumber;

    const results = purchaseHistory.getTickets
      .map((ticket) => {
        const ticketResult = new Set([
          ...ticket.getNumbers,
          ...winningDetailNumber,
        ]);
        return ticketResult.size;
      })
      .reduce((rankingObject, curResult) => {
        if (curResult in rankingObject) {
          rankingObject[curResult - 6] += 1;
        } else {
          rankingObject[curResult - 6] = 1;
        }

        return rankingObject;
      }, {});
    this.#winner = results;
  }

  get getWinner() {
    return this.#winner;
  }
}

export default WinningDetail;
