import { lottoMoneyRule } from "../rules";
import { Lotto, WinningLotto, RandomNumbersGenerator, LottoRank } from "./index";
import { lottoMachineRule } from "../rules/LottoMachine.rule";
import { LOTTO_MONEY_ERR_MSG, LOTTO_PLAYABLE_STATE_ERR_MSG } from "../constants/error";
export class LottoMachine {
  UNPLAYABLE = "n";
  PLAYABLE = "y";
  static LOTTO_PRICE = 1000;

  lottos = [];
  #_playable = this.PLAYABLE;

  constructor() {}

  buy(money) {
    if (!this.validates(money)) return;

    const lottos = new Set();
    const theNumberOfLottos = this.countTheNumberOfLottos(money);

    while (lottos.size < theNumberOfLottos) {
      const lotto = this.generateLottoNumbers();
      lottos.add(JSON.stringify(lotto));
    }

    this.lottos = Array.from(lottos).map((lotto) => new Lotto(JSON.parse(lotto)));

    return this.lottos;
  }

  countTheNumberOfLottos(money) {
    return Math.floor(money / LottoMachine.LOTTO_PRICE);
  }

  generateLottoNumbers() {
    const generator = new RandomNumbersGenerator();

    return generator.generateRandomNumbers();
  }

  getLottoResult(winningLotto) {
    const lottoRank = new LottoRank(this.lottos, winningLotto);
    const lottoResult = lottoRank.getLottoResult();

    return lottoResult;
  }

  /**
   * @param {Lotto} winningNumbers
   * @param {number} bonusNumber
   */
  generateWinningLotto(winningNumbers, bonusNumber) {
    return new WinningLotto(winningNumbers, bonusNumber);
  }

  get playable() {
    return this.#_playable === this.PLAYABLE;
  }

  updatePlayableState(value) {
    if (!this.isPlayableState) throw new Error(LOTTO_PLAYABLE_STATE_ERR_MSG);

    this.#_playable = value;
  }

  validates(money) {
    if (!this.isMoneyValid(money)) throw new Error(LOTTO_MONEY_ERR_MSG);

    return true;
  }

  isMoneyValid(money) {
    return typeof money === "number" && !isNaN(money) && money > 0;
  }

  isPlayableState(value) {
    return Array.from([LottoMachine.PLAYABLE, LottoMachine.UNPLAYABLE]).includes(value);
  }
}
