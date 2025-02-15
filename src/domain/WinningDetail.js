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
    const winningNumbers = lotto.getWinningNumber;
    const bonusNumber = lotto.getBonusNumber;

    const results = purchaseHistory.getTickets
      .map((ticket) => {
        const ticketResult = ticket.getNumbers.filter((tickerNumber) =>
          winningNumbers.some(
            (winningNumber) =>
              tickerNumber === winningNumber || tickerNumber === bonusNumber,
          ),
        );

        switch (ticketResult.length) {
          case 6:
            if (ticketResult.includes(bonusNumber) === false) {
              return 1;
            }

            return 2;

          case 5:
            return 3;
          case 4:
            return 4;
          case 3:
            return 5;
          default:
            return -1;
        }
      })
      .reduce((rankingObject, curResult) => {
        if (curResult === -1) {
          return rankingObject;
        }

        if (curResult in rankingObject) {
          rankingObject[curResult] += 1;
        } else {
          rankingObject[curResult] = 1;
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
