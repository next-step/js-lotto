import AbstractView from './AbstractView.js';
import LottoVendingMachine from '../LottoVendingMachine.js';
import Purchase from '../Purchase.js';
import wallet from '../data/wallet.js';

const $purchaseLottoForm = document.querySelector('#purchase-lotto-form');
const $purchaseMoney = $purchaseLottoForm.querySelector('input');
const $purchaseLottoSection = document.querySelector(
  '#purchased-lotto-section'
);
const $purchasedLottoAmount =
  $purchaseLottoSection.querySelector('label.my-0 span');
const $showLottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
const $purchasedLottoTickets = $purchaseLottoSection.querySelector(
  'div.d-flex.flex-wrap'
);

function lottoTicketTemplate(lotto) {
  const $template = document.createElement('template');
  $template.innerHTML = `<span class="mx-1 text-4xl">🎟️  <span>${lotto}</span></span>`;
  return $template.content.firstChild;
}

class PurchaseLottoView extends AbstractView {
  static #initializeMoney() {
    $purchaseMoney.value = null;
  }

  static #initializePurchasedLotto() {
    $purchasedLottoTickets.innerHTML = '';
  }

  static #isShowPurchasedLottoNumbers() {
    return $showLottoNumbersToggleButton.checked;
  }

  static #showPurchasedLottoNumbers() {
    $purchasedLottoTickets.classList.remove('hide');
  }

  static #hidePurchasedLottoNumbers() {
    $purchasedLottoTickets.classList.add('hide');
  }

  static #showPurchasedLotto() {
    $purchaseLottoSection.classList.remove('hide');
  }

  static #hidePurchasedLotto() {
    $purchaseLottoSection.classList.add('hide');
  }

  static #changePurchasedLottoAmount(amount) {
    $purchasedLottoAmount.innerText = amount;
  }

  static #changePurchaseLottoTickets(lottoList) {
    const $lottos = document.createDocumentFragment();
    lottoList.forEach((lotto) => {
      $lottos.appendChild(lottoTicketTemplate(lotto));
    });

    $purchasedLottoTickets.replaceChildren($lottos);
  }

  static #changePurchasedLotto(lottoList) {
    PurchaseLottoView.#changePurchasedLottoAmount(lottoList.length);
    PurchaseLottoView.#changePurchaseLottoTickets(lottoList);
    PurchaseLottoView.#showPurchasedLotto();
    PurchaseLottoView.#handleToggleLottoNumbers();
  }

  static #handlePurchaseLotto(event, onPurchasedLotto) {
    const money = new FormData(event.currentTarget).get('money');
    event.preventDefault();
    if (Purchase.isValidMoney(money)) {
      wallet.setLottos(LottoVendingMachine.purchaseLotto(money));
      PurchaseLottoView.#changePurchasedLotto(wallet.lottos());
      onPurchasedLotto();
    }
  }

  static #handleToggleLottoNumbers() {
    if (PurchaseLottoView.#isShowPurchasedLottoNumbers()) {
      PurchaseLottoView.#showPurchasedLottoNumbers();
      return;
    }

    PurchaseLottoView.#hidePurchasedLottoNumbers();
  }

  static initialize() {
    PurchaseLottoView.#initializeMoney();
    PurchaseLottoView.#initializePurchasedLotto();
    PurchaseLottoView.#hidePurchasedLotto();
  }

  static eventBindings(onPurchasedLotto) {
    $purchaseLottoForm.addEventListener('submit', (event) =>
      PurchaseLottoView.#handlePurchaseLotto(event, onPurchasedLotto)
    );
    $showLottoNumbersToggleButton.addEventListener(
      'click',
      PurchaseLottoView.#handleToggleLottoNumbers
    );
  }
}
export default PurchaseLottoView;
