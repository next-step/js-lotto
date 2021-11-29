import { computedAmount, getLottoNumberList } from "../utils/common.js";

class Model {
  tag = "Model";
  #purchaseAmount;
  #lottoTickets = [];
  // #winningNumber = [];
  
  log = () => {
    console.log(`[${this.tag}]:`);
  }

  set purchaseAmount(purchaseAmount) {
    this.#purchaseAmount = computedAmount(purchaseAmount);
    // console.log(this.#purchaseAmount);

    this.lottoTickets = this.#purchaseAmount;
  }

  get purchaseAmount() {
    return this.#purchaseAmount;
  }

  set lottoTickets(amount) {
    this.#lottoTickets = new Array(amount).fill(0).map(v => getLottoNumberList());
    // console.log(`[${this.TAG}] this.#lottoTickets -> ${this.#lottoTickets}`)
  }

  get lottoTickets() {
    return this.#lottoTickets;
  }
}

export default new Model();
