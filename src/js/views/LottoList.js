class LottoList {
  /** @type {HTMLElement} */
  #root;

  /** @type {Array<HTMLDivElement>} */
  #lottoElements;

  /** @type {boolean} */
  #open;

  constructor(root) {
    this.#root = root;
    this.#open = false;
    this.#lottoElements = [];
  }

  #toggleLottoDetail(open) {
    this.#open = open;
    this.#root.classList.toggle('flex-col', open);
    this.#lottoElements.forEach((lotto) => {
      lotto.querySelector('.lotto-detail').style.display = open ? '' : 'none';
    });
  }

  showLottoDetail() {
    this.#toggleLottoDetail(true);
  }

  hideLottoDetail() {
    this.#toggleLottoDetail(false);
  }

  #createLottoElement(lotto) {
    const wrapper = document.createElement('div');
    wrapper.classList = 'd-flex items-center';

    const icon = document.createElement('span');
    icon.textContent = '🎟️';
    icon.classList = 'mx-1 text-4xl';

    const detail = document.createElement('span');
    detail.textContent = lotto.join(', ');
    detail.className = 'lotto-detail';
    detail.style.display = this.#open ? 'inline-block' : 'none';

    wrapper.appendChild(icon);
    wrapper.appendChild(detail);

    return wrapper;
  }

  #convertToDOM(lottos) {
    this.#lottoElements = lottos.map((lotto) => {
      return this.#createLottoElement(lotto);
    });
  }

  #createLottoItems() {
    const items = this.#lottoElements.reduce((fragment, lotto) => {
      const item = document.createElement('li');
      item.appendChild(lotto);
      item.className = 'lotto-list-item';

      fragment.appendChild(item);
      return fragment;
    }, document.createDocumentFragment());

    return items;
  }

  render(lottos) {
    this.#convertToDOM(lottos);
    this.#root.replaceChildren(this.#createLottoItems());
  }
}

export default LottoList;
