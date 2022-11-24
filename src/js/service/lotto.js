import { createRandomNumbers } from "../utils/operate.js";
class Lotto {
  #lottos;

  issueLottos(number) {
    const lottos = Array.from(Array(number), () => createRandomNumbers());
    this.#lottos = lottos;
    return lottos;
  }
}

export default new Lotto();
