import { LOTTO_ICON } from "../utils/constants.js";
import { CHARGE_FORM, CHARGE_INPUT, NUMBER_OF_LOTTOS, LOTTOS, NUMBER_VISIBILITY_TOGGLE } from "../utils/selectors.js";

import { View } from "./View.js";

export class LottoView extends View {
  $charge;
  $chargeInput;
  $numOfLottos;
  $lottos;
  $visibilityToggle;

  constructor($target) {
    super($target);
    this.$charge = $target.querySelector(CHARGE_FORM);
    this.$chargeInput = $target.querySelector(CHARGE_INPUT);
    this.$numOfLottos = $target.querySelector(NUMBER_OF_LOTTOS);
    this.$lottos = $target.querySelector(LOTTOS);
    this.$visibilityToggle = $target.querySelector(NUMBER_VISIBILITY_TOGGLE);
  }

  render(state) {
    const { numOfLottos, lottos, isVisualizeLottoNumbers } = state;
    this.renderNumOfLottos(numOfLottos);
    this.renderLotteries(lottos, isVisualizeLottoNumbers);
    this.resetChargeInput();
  }

  resetChargeInput() {
    this.$chargeInput.value = "";
  }

  renderNumOfLottos(numOfLottos) {
    this.$numOfLottos.innerText = `총 ${numOfLottos}개를 구매하였습니다.`;
  }

  renderLotteries(lottos, isVisualizeLottoNumbers) {
    this.$lottos.innerHTML = lottos.map((lotto) => this.generateLottoElement(lotto, isVisualizeLottoNumbers)).join("");
  }

  generateLottoElement = (lotto, isVisualizeLottoNumbers) => {
    return `
      <li class="mx-1 text-4xl">
        ${LOTTO_ICON} <span style="display: ${isVisualizeLottoNumbers ? "inline" : "none"}">${lotto.join(", ")}</span>
      </li>
    `;
  };
}
