export class Wallet {
  #lottos;

  constructor() {
    this.removeAllLottos();
  }

  get lottos() {
    return this.#lottos;
  }

  get isEmpty() {
    return (this.lottos ?? []).length === 0;
  }

  setLottos(lottos) {
    this.#lottos = lottos;
  }

  removeAllLottos() {
    this.#lottos = null;
  }
}
