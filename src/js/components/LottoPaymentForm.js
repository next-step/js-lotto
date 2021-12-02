import { LOTTO_NUMBER, TICKET } from "../constants/lotto.js";
import { CLASS_NAME, INPUT_NAME } from "../constants/selectors.js";
import lottoStore, { LOTTO_STORE_KEY } from "../lottoStore.js";
import { generateRamdomNumbers } from "../utils/random.js";

class LottoPaymentForm {
  constructor() {
    this.$paymentForm = document.querySelector(CLASS_NAME.PAYMENT_FORM);
  }

  init() {
    this.$paymentForm.addEventListener("submit", this.onPaymentSubmit.bind(this));
    this.$paymentForm.addEventListener("keydown", this.onPaymentKeydown.bind(this));
  }

  onPaymentSubmit(event) {
    event.preventDefault();

    const payment = Number(event.target.elements[INPUT_NAME.PAYMENT_INPUT].value);
    const paymentChanges = payment % TICKET.PRICE;
    const ticketCount = Math.floor(payment / TICKET.PRICE);
    const lottoNumbers = [...Array(ticketCount)].map(() =>
      generateRamdomNumbers(LOTTO_NUMBER.MIN_VALUE, LOTTO_NUMBER.MAX_VALUE, LOTTO_NUMBER.LENGTH)
    );

    lottoStore.setState(LOTTO_STORE_KEY.PAYMENT, payment);
    lottoStore.setState(LOTTO_STORE_KEY.PAYMENT_CHANGES, paymentChanges);
    lottoStore.setState(LOTTO_STORE_KEY.TICKET_COUNT, ticketCount);
    lottoStore.setState(LOTTO_STORE_KEY.LOTTO_NUMBERS, lottoNumbers);

    event.target.reset();
  }

  onPaymentKeydown(event) {
    if (/[.-]/.test(event.key)) {
      event.preventDefault();
    }
  }
}

export default LottoPaymentForm;
