import { SELECTORS, LOTTO_ICON } from "../constants.js";

import { View } from "./View.js";

export class LottoView extends View {
  $charge;
  $chargeInput;
  $numOfLottos;
  $lottos;
  $visibilityToggle;

  constructor($target) {
    super($target);
    this.$charge = $target.querySelector(SELECTORS.CHARGE_FORM);
    this.$chargeInput = $target.querySelector(SELECTORS.CHARGE_INPUT);
    this.$numOfLottos = $target.querySelector(SELECTORS.NUMBER_OF_LOTTOS);
    this.$lottos = $target.querySelector(SELECTORS.LOTTOS);
    this.$visibilityToggle = $target.querySelector(SELECTORS.NUMBER_VISIBILITY_TOGGLE);
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
