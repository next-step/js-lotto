class LottoView {
  #root;

  #list;

  #lottoElements;

  #open;

  constructor(root) {
    this.#root = root;
    this.#list = this.#root.querySelector('#lotto-list');
    this.#open = false;
    this.#lottoElements = [];

    this.#root
      .querySelector('.lotto-numbers-toggle-button')
      .addEventListener('change', (e) => {
        if (e.target.checked) {
          this.#showLottoDetail();
        } else {
          this.#hideLottoDetail();
        }
      });
  }

  resetSwitch() {
    this.#root.querySelector('.lotto-numbers-toggle-button').checked = false;
    this.#hideLottoDetail();
  }

  #toggleLottoDetail(open) {
    this.#open = open;
    this.#list.classList.toggle('flex-col', open);
    this.#lottoElements.forEach((lotto) => {
      lotto.querySelector('.lotto-detail').style.display = open ? '' : 'none';
    });
  }

  #showLottoDetail() {
    this.#toggleLottoDetail(true);
  }

  #hideLottoDetail() {
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

  renderMessage(lotto) {
    this.#root.querySelector(
      '#orders-message'
    ).textContent = `총 ${lotto.length}개를 구매하였습니다.`;
  }

  renderList(lotto) {
    this.#convertToDOM(lotto.getNumbers());
    this.#list.replaceChildren(this.#createLottoItems());
  }

  show() {
    this.#root.style.display = null;
    return this;
  }

  hide() {
    this.#root.style.display = 'none';
    return this;
  }
}

export default LottoView;
