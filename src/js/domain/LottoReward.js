export class LottoReward {
  #prize;

  constructor(prize) {
    this.#prize = prize;
  }

  get prize() {
    return this.#prize;
  }
}
