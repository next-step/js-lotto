export class Wallet {
  #lottos;

  constructor() {
    this.removeAllLottos();
  }

  get lottos() {
    return this.#lottos;
  }

  removeAllLottos() {
    this.#lottos = null;
  }

  addLottos(lottos) {
    this.#lottos = lottos;
  }
}
