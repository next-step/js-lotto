import Lotto from "../Lotto/index.js";
import PurchaseHistory from "../PurchaseHistory/index.js";
import { WINNING_KEY, WINNING_CONDITION_KEY } from "./rule.js";
import { RULES } from "../../util/rule.js";
import { ERROR_WINNING } from "./error.js";

class WinningDetail {
  #winner;

  // 객체를 주입받아서 사용한다.
  constructor({ purchaseHistory, lotto }) {
    if (purchaseHistory instanceof PurchaseHistory === false) {
      throw new Error(ERROR_WINNING.NOT_PRINT_WINNING_DETAIL);
    }
    if (lotto instanceof Lotto === false) {
      throw new Error(ERROR_WINNING.NOT_PRINT_WINNING_DETAIL);
    }
    this.#setWinner(purchaseHistory, lotto);
  }

  #setWinner(purchaseHistory, lotto) {
    const winningNumbers = lotto.getWinningNumber;
    const bonusNumber = lotto.getBonusNumber;

    const initialWinnersResult = {
      [WINNING_KEY.FIRST]: WINNING_KEY.INITIAL,
      [WINNING_KEY.SECOND]: WINNING_KEY.INITIAL,
      [WINNING_KEY.THIRD]: WINNING_KEY.INITIAL,
      [WINNING_KEY.FOURTH]: WINNING_KEY.INITIAL,
      [WINNING_KEY.FIFTH]: WINNING_KEY.INITIAL,
    };

    const results = purchaseHistory.getTickets
      .map((ticket) => {
        const ticketResult = ticket.getNumbers.filter((tickerNumber) =>
          winningNumbers.some(
            (winningNumber) =>
              tickerNumber === winningNumber || tickerNumber === bonusNumber,
          ),
        );
        switch (ticketResult.length) {
          case WINNING_CONDITION_KEY.FIRST_AND_SECOND:
            if (ticketResult.includes(bonusNumber) === false) {
              return WINNING_KEY.FIRST;
            }
            return WINNING_KEY.SECOND;
          case WINNING_CONDITION_KEY.THIRD:
            return WINNING_KEY.THIRD;
          case WINNING_CONDITION_KEY.FOURTH:
            return WINNING_KEY.FOURTH;
          case WINNING_CONDITION_KEY.FIFTH:
            return WINNING_KEY.FIFTH;
          default:
            return WINNING_KEY.OTHER;
        }
      })
      .reduce((rankingObject, curResult) => {
        if (curResult === WINNING_KEY.OTHER) {
          return rankingObject;
        }
        if (curResult in rankingObject) {
          rankingObject[curResult] += RULES.WINNING_PERSON_PLUS;
        } else {
          rankingObject[curResult] = RULES.WINNING_PERSON_INITIAL;
        }
        return rankingObject;
      }, initialWinnersResult);
    this.#winner = results;
  }

  get getWinner() {
    return this.#winner;
  }
}

export default WinningDetail;
