export class LottoStore {
  #money = 0;
  #lottos = [];
  #winning = [];

  get money() {
    return this.#money;
  }
  set money(value) {
    this.#money = value;
  }
  get lottos() {
    return this.#lottos;
  }
  set lottos(lottos) {
    this.#lottos = lottos;
  }
  get winning() {
    return this.#winning;
  }
  set winning(winning) {
    this.#winning = winning;
  }

  printLotto() {
    console.log(this.#lottos);
    console.log(this.#winning);
  }

  initStore() {
    this.#money = 0;
    this.#lottos = [];
    this.#winning = [];
  }
}
