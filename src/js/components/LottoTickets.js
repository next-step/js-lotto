import { STATUS_MESSAGE } from "../constants/messages.js";
import { CLASS_NAME } from "../constants/selectors.js";
import lottoStore, { LOTTO_STORE_KEY } from "../lottoStore.js";

class LottoTickets {
  constructor() {
    this.$ticketContainer = document.querySelector(CLASS_NAME.TICKET_CONTAINER);
    this.$lottoPurchaseStatus = document.querySelector(CLASS_NAME.LOTTO_PURCHASE_STATUS);
    this.$toggleButton = document.querySelector(CLASS_NAME.LOTTO_NUMBER_TOGGLE_BUTTON);
  }

  init() {
    lottoStore.subscribeState(
      [LOTTO_STORE_KEY.TICKET_COUNT, LOTTO_STORE_KEY.PAYMENT_CHANGES, LOTTO_STORE_KEY.LOTTO_NUMBERS],
      this.onChangePayment.bind(this)
    );

    this.$toggleButton.addEventListener("change", this.onToggle.bind(this));
  }

  onChangePayment() {
    this.showPurchaseStatus();
    this.showTickets();
  }

  onToggle(event) {
    if (event.target.checked) {
      this.showLottoNumbers();
    } else {
      this.hideLottoNumbers();
    }
  }

  showPurchaseStatus() {
    const { ticketCount, paymentChanges } = lottoStore.selectState();

    this.$lottoPurchaseStatus.textContent = STATUS_MESSAGE.LOTTO_PURCHASE(ticketCount, paymentChanges);
  }

  showTickets() {
    const { lottoNumbers } = lottoStore.selectState();

    this.$toggleButton.disabled = false;
    this.$ticketContainer.innerHTML = lottoNumbers
      .map(
        (lotto) => `
          <div class="${CLASS_NAME.TICKET.slice(1)} d-flex align-center">
            <span class="text-3xl mr-2">🎟️ </span>
            <span class="${CLASS_NAME.LOTTO_NUMBERS.slice(1)} text-xl d-none">${lotto.join(", ")}</span>
          </div>
        `
      )
      .join("");
  }

  showLottoNumbers() {
    this.$ticketContainer.classList.remove("d-flex");
    document
      .querySelectorAll(CLASS_NAME.LOTTO_NUMBERS)
      .forEach(($lottoNumbers) => $lottoNumbers.classList.remove("d-none"));
  }

  hideLottoNumbers() {
    this.$ticketContainer.classList.add("d-flex");
    document
      .querySelectorAll(CLASS_NAME.LOTTO_NUMBERS)
      .forEach(($lottoNumbers) => $lottoNumbers.classList.add("d-none"));
  }
}

export default LottoTickets;
