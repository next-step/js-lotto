import { PRICE_PER_LOTTO, SELECTORS } from "./constants.js";

export class App {
  $app;
  pricePerLotto = PRICE_PER_LOTTO;
  state = {
    charge: 0,
    numOfLotto: 0,
    lotto: [],
  };

  constructor($app) {
    this.$app = $app;
    this.addEvents();
    this.render();
  }

  get $charge() {
    return this.$app.querySelector(SELECTORS.CHARGE_FORM);
  }

  get $numOfLotto() {
    return this.$app.querySelector(SELECTORS.NUMBER_OF_LOTTO);
  }

  get $lotteries() {
    return this.$app.querySElector(SELECTORS.LOTTERIES);
  }

  render() {
    const { numOfLotto } = this.state;
    this.$numOfLotto.innerText = `총 ${numOfLotto}개를 구매하였습니다.`;
  }

  setState(next) {
    this.state = {
      ...this.state,
      ...next,
    };
    this.render();
  }

  isValidCharge(charge) {
    if (isNaN(charge)) throw new TypeError("Type of charge must be number");
    if (charge % this.pricePerLotto !== 0) throw new Error(`${this.pricePerLotto}단위 값을 입력해주세요.`);
    return true;
  }

  purchase(e) {
    try {
      e.preventDefault();
      const charge = Number(new FormData(e.target).get("charge"));
      if (this.isValidCharge(charge)) {
        const nextState = {
          numOfLotto: charge / this.pricePerLotto,
        };
        this.setState(nextState);
      }
    } catch (e) {
      if (e instanceof TypeError) throw e;
      window.alert(e.message);
    }
  }

  addEvents() {
    this.$charge.addEventListener("submit", this.purchase.bind(this));
  }
}
