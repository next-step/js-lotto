import { LOTTO_NUMBER, TICKET } from "../constants/lotto.js";
import lottoStore, { LOTTO_STORE_KEY } from "../lottoStore.js";
import { generateRamdomNumbers } from "../utils/random.js";

class LottoPaymentForm {
  constructor($paymentForm, paymentInputName) {
    this.$paymentForm = $paymentForm;
    this.paymentInputName = paymentInputName;
  }

  init() {
    this.$paymentForm.addEventListener("submit", this.onPaymentSubmit.bind(this));
  }

  onPaymentSubmit(event) {
    event.preventDefault();

    const payment = Number(event.target.elements[this.paymentInputName].value);
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
}

export default LottoPaymentForm;
