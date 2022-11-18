class Lotto {
  lottos = [];

  issueLottos(number) {
    this.lottos = Array.from(Array(number), () => this.createRandomNumbers());
  }

  createRandomNumbers() {
    let randomNumbers = [];
    for (let i = 0; i < 6; i++) {
      randomNumbers.push(Math.floor(Math.random() * 45) + 1);
    }
    return randomNumbers;
  }

  clearLottos() {
    this.lottos = [];
  }
}

export const getLottoPapers = () => {
  return lotto.lottos.reduce(
    (prev, curr) =>
      prev +
      `<div class="mx-1 text-4xl">
  <span class="lotto-icon">🎟️</span>
  <span class="lotto-numbers">${curr.join(", ")}</span>
</div>`,
    ""
  );
};

export const lotto = new Lotto();
