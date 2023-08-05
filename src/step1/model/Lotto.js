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

  #organizeLottos() {
    this.#lottos = this.#lottos.reduce((acc, cur, arrayIndex) => {
      const lottoIndex = Math.floor(arrayIndex / DEFAULT_LIMIT_LOTTO_COUNT);
      const isCreateNewLotto = !acc[lottoIndex];
      if (isCreateNewLotto) acc[lottoIndex] = [];
      acc[lottoIndex].push(cur);
      return acc;
    }, []);
  }

  // 메서드 리팩터링 필요
  createLotto(cycle = 1) {
    this.#addLottoNumbers(cycle);
    this.#organizeLottos();
    return this.#lottos;
  }
}
