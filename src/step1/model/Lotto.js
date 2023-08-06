import { RandomNumberGenerator } from '../utils/generator/index.js';
import {
  DEFAULT_LIMIT_LOTTO_COUNT,
  EXIT_GENERATE_LOTTO_COUNT,
} from '../constants/lotto.js';

export default class Lotto {
  #lottos;

  #limitCount;

  constructor() {
    this.#lottos = [];
    this.#limitCount = DEFAULT_LIMIT_LOTTO_COUNT;
  }

  #setLimitCount(cycle) {
    this.#limitCount *= cycle;
  }

  #addLottoNumbers(cycle) {
    this.#setLimitCount(cycle);
    while (this.#limitCount !== EXIT_GENERATE_LOTTO_COUNT) {
      const randomNumber = RandomNumberGenerator.generateRandomNumber();
      this.#lottos.push(randomNumber);
      this.#limitCount -= 1;
    }
  }

  #organizeLottos(lottos, chunkSize) {
    const results = [];
    while (lottos.length) {
      results.push(lottos.splice(0, chunkSize));
    }
    this.#lottos = results;
  }

  createLotto(cycle = 1) {
    this.#addLottoNumbers(cycle);
    this.#organizeLottos(this.#lottos, DEFAULT_LIMIT_LOTTO_COUNT);
    return this.#lottos;
  }
}
