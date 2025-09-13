const LOTTO_PRICE = 1000;
const LOTTT_NUMER_RANGE = [
  ...new Array(45).fill(0).map((_, index) => index + 1),
];

class Lotto {
  #numbers = [];
  constructor() {
    this.#numbers = [...LOTTT_NUMER_RANGE]
      .splice(0, 6)
      .sort(() => Math.random() * 5);
  }
  getNumbers() {
    return this.#numbers;
  }
}

const createLotto = (purchaseAmount) => {
  const lottoCount = Math.floor(parseInt(purchaseAmount) / LOTTO_PRICE);
  return new Array(lottoCount).fill(null).map(() => new Lotto());
};

export default { Lotto, LOTTO_PRICE, LOTTT_NUMER_RANGE, createLotto };
