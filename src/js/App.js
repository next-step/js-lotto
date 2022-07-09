import { PRICE_PER_LOTTO, LOTTO_ICON, SELECTORS } from "./constants.js";
import { randomInt } from "./utils.js";

export class App {
  $app;
  pricePerLotto = PRICE_PER_LOTTO;
  MAX_NUMBER = 45;
  MIN_NUMBER = 1;
  NUMBER_OF_SELECTABLE_LOTTOS = 5;
  state = {
    numOfLottos: 0,
    lottos: [],
    isVisualizeLottoNumbers: false,
  };

  constructor($app) {
    this.$app = $app;
    this.render();
    this.addEventHandlers();
  }

  get $charge() {
    return this.$app.querySelector(SELECTORS.CHARGE_FORM);
  }

  get $chargeInput() {
    return this.$app.querySelector(SELECTORS.CHARGE_INPUT);
  }

  get $numOfLottos() {
    return this.$app.querySelector(SELECTORS.NUMBER_OF_LOTTOS);
  }

  get $lottos() {
    return this.$app.querySelector(SELECTORS.LOTTOS);
  }

  get $visibilityToggle() {
    return this.$app.querySelector(SELECTORS.NUMBER_VISIBILITY_TOGGLE);
  }

  setState(next) {
    this.state = {
      ...this.state,
      ...next,
    };
    this.render();
  }

  render() {
    const { numOfLottos, lottos, isVisualizeLottoNumbers } = this.state;
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

  isValidCharge(charge) {
    if (isNaN(charge)) throw new TypeError("Type of charge must be number");
    if (charge % this.pricePerLotto !== 0) throw new Error(`${this.pricePerLotto}원 단위로만 구매할 수 있습니다.`);
    return true;
  }

  generateLotto() {
    const lotto = new Set();
    while (lotto.size < this.NUMBER_OF_SELECTABLE_LOTTOS) {
      lotto.add(randomInt(this.MIN_NUMBER, this.MAX_NUMBER));
    }
    return Array.from(lotto);
  }

  generateLotteries(numOfLotto) {
    return Array(numOfLotto)
      .fill(undefined)
      .map(() => this.generateLotto());
  }

  purchase(e) {
    try {
      e.preventDefault();
      const charge = Number(new FormData(e.target).get("charge"));
      if (this.isValidCharge(charge)) {
        const numOfLottos = charge / this.pricePerLotto;
        const nextState = {
          numOfLottos,
          lottos: this.generateLotteries(numOfLottos),
        };
        this.setState(nextState);
      }
    } catch (e) {
      if (e instanceof TypeError) throw e;
      window.alert(e.message);
    }
  }

  toggleLottoNumbers() {
    this.setState({ isVisualizeLottoNumbers: !this.state.isVisualizeLottoNumbers });
  }

  addEventHandlers() {
    this.$charge.addEventListener("submit", this.purchase.bind(this));
    this.$visibilityToggle.addEventListener("change", this.toggleLottoNumbers.bind(this));
  }
}
