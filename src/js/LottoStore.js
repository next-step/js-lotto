export class LottoStore {
  #lottos = [];

  get lottos() {
    return this.#lottos;
  }
  set lottos(lottos) {
    this.#lottos = lottos;
  }
}
