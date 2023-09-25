import { LOTTO_TICKET_MARKER, LOTTO_TOGGLE_MESSAGE } from '../../constants/index.js';

import {
  createElement,
  createFragment,
  clearElement,
  addClassNames,
  clearClassNames,
  showElement,
  hideElement,
  getQuerySelector,
  getQuerySelectorAll
} from '../../../view/DOMHandler.js';

import { addEvent } from '../../../view/eventHandler.js';

class LottoTicketList {
  #toggleState = false;
  #lottoTickets = [];
  #lottoPrice = 0;
  #ticketListContainer = null;
  #inputBuilder = null;
  #LottoCustomer = null;
  #LottoSeller = null;

  constructor(inputBuilder, lottoPrice, LottoCustomer, LottoSeller) {
    this.#lottoPrice = lottoPrice;
    this.#inputBuilder = inputBuilder;
    this.#LottoCustomer = LottoCustomer;
    this.#LottoSeller = LottoSeller;
  }

  #createLottoTicketListLabel() {
    const $label = createElement('label');
    addClassNames($label, ['flex-auto', 'my-0']);
    $label.textContent = `총 ${this.#lottoTickets.length}개를 구매하였습니다.`;
    return $label;
  }

  #setLottoTickets(amount) {
    const lottoCustomer = new this.#LottoCustomer(amount);
    const lottoSeller = new this.#LottoSeller(this.#lottoPrice);
    lottoCustomer.buyAutoLottoTicket(lottoSeller);
    this.#lottoTickets = [...lottoCustomer.lottoTickets];
  }

  #createLottoTicketListContainer() {
    const $section = createElement('section');
    addClassNames($section, ['mt-9']);
    return $section;
  }

  #createLottoPurchaseInfo() {
    const $container = createElement('div');
    const $ticketListLabel = this.#createLottoTicketListLabel();
    const $checkboxSpan = createElement('span');
    $checkboxSpan.textContent = LOTTO_TOGGLE_MESSAGE;
    const $listContainer = createElement('div');
    const $toggleCheckboxContainer = this.#inputBuilder.createInput(true);

    this.#configureCheckbox($toggleCheckboxContainer);
    addClassNames($container, ['d-flex']);
    addClassNames($listContainer, ['d-flex', 'flex-auto', 'justify-end', 'pr-1']);
    addClassNames($checkboxSpan, ['text-base', 'font-normal']);

    $toggleCheckboxContainer.appendChild($checkboxSpan);
    $listContainer.appendChild($toggleCheckboxContainer);
    $container.append($ticketListLabel, $listContainer);
    return $container;
  }

  #configureTicketListStyle() {
    const detailLottoTicketListClassNames = ['d-flex', 'flex-wrap', 'flex-col'];
    const lottoTicketListClassNames = ['d-flex', 'flex-wrap'];
    const $ticketListContainer = getQuerySelector('ul', this.#ticketListContainer);
    const $lottoNumbers = getQuerySelectorAll('.lotto-number', $ticketListContainer);

    $lottoNumbers.forEach(($lottoNumber) => {
      if (this.#toggleState) {
        showElement($lottoNumber, 'inline');
      } else {
        hideElement($lottoNumber);
      }
    });
    clearClassNames($ticketListContainer);
    addClassNames(
      $ticketListContainer,
      this.#toggleState ? detailLottoTicketListClassNames : lottoTicketListClassNames
    );
  }

  #configureCheckbox($checkboxLabel) {
    const $checkbox = getQuerySelector('input', $checkboxLabel);
    addEvent($checkbox, 'change', (event) => this.#handleToggleCheckbox(event));
    addClassNames($checkboxLabel, ['switch']);
    addClassNames($checkbox, ['lotto-numbers-toggle-button']);
  }

  #createLottoTicketList() {
    const $ticketList = createElement('ul');
    const $ticketListFragment = createFragment();

    this.#lottoTickets.forEach((lottoTicket) => {
      const $lottoTicket = createElement('li');
      const $lottoIcon = createElement('span');
      const $lottoNumber = createElement('span');
      $lottoIcon.textContent = LOTTO_TICKET_MARKER;
      $lottoNumber.textContent = lottoTicket.lottoNumber;
      addClassNames($lottoIcon, ['mx-1', 'text-2xl', 'lotto-icon']);
      addClassNames($lottoNumber, ['mx-2', 'text-2xl', 'lotto-number']);
      addClassNames($lottoTicket, ['mx-1', 'text-2xl']);
      $lottoTicket.append($lottoIcon, $lottoNumber);
      $ticketListFragment.appendChild($lottoTicket);
    });
    $ticketList.append($ticketListFragment);
    return $ticketList;
  }

  #handleToggleCheckbox(event) {
    this.#toggleState = event.target.checked;
    this.#configureTicketListStyle();
  }

  handleAmount(amount) {
    this.#setLottoTickets(amount);
    const $purchaseInfo = this.#createLottoPurchaseInfo();
    const $lottoTicketList = this.#createLottoTicketList();
    this.#ticketListContainer.append($purchaseInfo, $lottoTicketList);
    this.#configureTicketListStyle();
  }

  show() {
    showElement(this.#ticketListContainer);
  }

  hide() {
    hideElement(this.#ticketListContainer);
  }

  createLottoTicketList() {
    const $toggleCheckboxContainer = this.#createLottoTicketListContainer();
    const $listContainer = createElement('div');
    addClassNames($listContainer, ['d-flex', 'flex-wrap']);
    this.#ticketListContainer = $toggleCheckboxContainer;
    return this.#ticketListContainer;
  }
}

export default LottoTicketList;
