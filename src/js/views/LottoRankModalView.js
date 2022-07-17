class LottoRankModalView {
  #root;

  constructor(root) {
    this.#root = root;

    this.#root.querySelector('.modal-close').addEventListener('click', () => {
      this.close();
    });
  }

  open() {
    this.#root.classList.add('open');
  }

  close() {
    this.#root.classList.remove('open');
  }

  renderResult(lotto) {
    const countOfRanks = lotto.getCountOfRanks();

    this.#root.querySelectorAll('.rank').forEach((element) => {
      const { rank } = element.dataset;
      element.textContent = countOfRanks[rank] || 0;
    });

    this.#root.querySelector('#earnings-rate').textContent =
      lotto.getEarningsRate();
  }

  addResetEventListener(handler) {
    this.#root.querySelector('#reset-btn').addEventListener('click', () => {
      this.close();
      handler();
    });
  }
}

export default LottoRankModalView;
