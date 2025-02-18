export default class Lotto {
  constructor(budget) {
    //로또 객체에서 있어야만 하는값 > 구매 금액, 로또 번호
    this.budget = budget;
    this.numbers = [];
  }

  //도메인 로직
  makeNumbers() {
    const LOTTO_NUMBER_COUNT = 6;
    const numbers = new Array(45).fill().map((_, index) => index + 1);

    for (let i = 0; i < 45; i++) {
      const randomIndex = Math.floor(Math.random() * 45);
      const tmp = numbers[i];
      numbers[i] = numbers[randomIndex];
      numbers[randomIndex] = tmp;
    }

    return numbers.slice(0, LOTTO_NUMBER_COUNT).sort((a, b) => a - b);
  }

  makeLotto() {
    this.numbers.push(this.makeNumbers());
  }
}

export const calculateLottoTicketLimit = (budget) => {
  const LOTTO_PRICE = 1000;
  return Math.floor(budget / LOTTO_PRICE);
};

export const buyLottos = (count, lotto) => {
  for (let i = 0; i < count; i++) {
    lotto.makeLotto();
  }
};
