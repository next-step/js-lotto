import { View } from "./View.js";

import { WINNING_NUMBER_FORM, AWARD_MODAL, AWARD_MODAL_CLOSE_BUTTON } from "../utils/selectors.js";

export class AwardView extends View {
  $awardModal;
  $winningNumberForm;

  constructor($app) {
    super($app);
    this.$winningNumberForm = $app.querySelector(WINNING_NUMBER_FORM);
    this.$awardModalCloseButton = $app.querySelector(AWARD_MODAL_CLOSE_BUTTON);
    this.$awardModal = $app.querySelector(AWARD_MODAL);
  }

  render(state) {
    const { isShowAward } = state;
    this.renderAwardModal(isShowAward);
  }

  renderAwardModal(isShowAward) {
    if (isShowAward) {
      this.$awardModal.classList.add("open");
    } else {
      this.$awardModal.classList.remove("open");
    }
  }
}
