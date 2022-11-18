class Lotto {
  lottos = [];

  issue(number) {
    for (let i = 0; i < number; i++) {
      this.lottos.push(this.createRandomNumbers());
    }
  }

  createRandomNumbers() {
    let randomNumbers = [];
    for (let i = 0; i < 6; i++) {
      randomNumbers.push(Math.floor(Math.random() * 45) + 1);
    }
    return randomNumbers;
  }

  initialize() {
    this.lottos = [];
  }
}

export const getLottoPapers = () => {
  return lotto.lottos
    .map(
      (lotto) => `<div class="mx-1 text-4xl">
  <span class="lotto-icon">🎟️</span>
  <span class="lotto-numbers" style="display: none; font-size: 22px;">${lotto.join(
    ", "
  )}</span>
</div>`
    )
    .join("");
};

export const lotto = new Lotto();
