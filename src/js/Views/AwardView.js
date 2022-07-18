import { View } from "./View.js";

import {
  WINNING_NUMBER_FORM,
  AWARD_MODAL,
  AWARD_MODAL_CLOSE_BUTTON,
  RESULT_TABLE_BODY,
  REVENUE,
  RESET_BUTTON,
} from "../utils/selectors.js";
import { BONUS_AWARD, WINNINGS } from "../utils/constants.js";
import { stringifyNumber } from "../utils/parser.js";

export class AwardView extends View {
  $awardModal;
  $winningNumberForm;
  $awardModal;
  $winningNumberForm;
  $awardModalCloseButton;
  $resultTableBody;
  $revenue;
  $resetButton;

  constructor($app) {
    super($app);
    this.$awardModal = $app.querySelector(AWARD_MODAL);
    this.$winningNumberForm = $app.querySelector(WINNING_NUMBER_FORM);
    this.$awardModalCloseButton = $app.querySelector(AWARD_MODAL_CLOSE_BUTTON);
    this.$resultTableBody = $app.querySelector(RESULT_TABLE_BODY);
    this.$revenue = $app.querySelector(REVENUE);
    this.$resetButton = $app.querySelector(RESET_BUTTON);
  }

  formatNumber(value) {
    value = Number(value);
    if (Number.isNaN(value)) return "-";
    return stringifyNumber(value);
  }

  render(state) {
    const { isShowAward, reward, revenue } = state;
    this.renderAwardModal(isShowAward);
    this.renderReward(reward);
    this.renderRevenue(revenue);
  }

  renderRevenue(revenue = 0) {
    this.$revenue.innerText = `당신의 총 수익률은 ${this.formatNumber(revenue)}%입니다`;
  }

  renderReward(reward) {
    const body = Object.entries(WINNINGS)
      .map(([rank, winning]) => this.getWinningTableBody(rank, winning, reward[rank]?.count))
      .join("");
    this.$resultTableBody.innerHTML = body;
  }

  getWinningTableBody(rank, winning, count = 0) {
    const label = rank === BONUS_AWARD.toString() ? "5개 + 보너스볼" : `${rank}개`;
    return `
      <tr class="text-center">
        <td class="p-3">${label}</td>
        <td class="p-3">${this.formatNumber(winning)}</td>
        <td class="p-3">${count}개</td>
      </tr>
    `;
  }

  renderAwardModal(isShowAward) {
    if (isShowAward) {
      this.$awardModal.classList.add("open");
    } else {
      this.$awardModal.classList.remove("open");
    }
  }
}
