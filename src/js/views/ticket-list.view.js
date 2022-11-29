import View from './view.js';

export default class TicketListView extends View {
  #lottoState;
  #resultWrap = document.querySelector('.result-wrap');
  #ticketList = document.querySelector('.ticket-list');
  #purchaseMessage = document.querySelector('.message-purchase');
  #btnViewNumber = document.querySelector('.btn-toggle-numbers');

  constructor(lottoState) {
    super('.ticket-list-wrap');

    this.#lottoState = lottoState;
    this.#lottoState.observers.push(this.#onStateChanged);
    this.#lottoState.reset.push(this.#resetElement);
    this.#setEvent();
  }

  #setEvent() {
    this.events = [
      {
        target: this.#btnViewNumber,
        event: 'click',
        handler: this.#toggleViewNumbers,
      },
    ];

    super.setEventHandler();
  }

  #toggleViewNumbers = () => {
    this.#ticketList.classList.toggle('view-numbers');
  };

  #onStateChanged = (state = []) => {
    if (!state.length) {
      return;
    }

    this.#setElement(state);
    this.#render(state);
  };

  #setElement(lotto) {
    if (this.#btnViewNumber.checked) {
      this.#btnViewNumber.checked = false;
      this.#toggleViewNumbers();
    }

    this.#resultWrap.classList.remove('hide');
    this.#purchaseMessage.innerHTML = `총 ${lotto.length}개를 구매하였습니다.`;
  }

  #resetElement = () => {
    if (this.#btnViewNumber.checked) {
      this.#btnViewNumber.checked = false;
      this.#toggleViewNumbers();
    }

    this.#resultWrap.classList.add('hide');
  };

  #render(lotto) {
    const list = lotto.map(item => `<li><span class="mx-1 text-4xl">🎟️</span><span class="numbers">${item.join(', ')}</span></li>`);

    this.#ticketList.innerHTML = list.join('');
  }
}
