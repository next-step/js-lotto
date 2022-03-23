export class Wallet {
  #lottos;

  constructor() {
    this.removeAllLottos();
  }

  get lottos() {
    return this.#lottos;
  }

  setLottos(lottos) {
    this.#lottos = lottos;
  }

  removeAllLottos() {
    this.#lottos = null;
  }
}
