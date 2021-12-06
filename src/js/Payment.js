import { calculatePayment } from "./utils/functions.js";
// import { countLottoTemplate } from "./utils/templates.js";

export default class Payment {
	constructor({ $payment, onSubmit }) {
		this.$payment = $payment;
		this.$paymentInput = document.querySelector(".payment-input");

		const clickSubmitEvent = (e) => {
			e.preventDefault();
			if (e.target.classList.contains("payment-submit")) {
				const countLotto = calculatePayment(this.$paymentInput.valueAsNumber);
				if (countLotto > 0) onSubmit(countLotto);
			}
		};
		this.$paymentInput.addEventListener("click", (e) => (e.target.value = ""));
		this.$payment.addEventListener("click", clickSubmitEvent);
	}
}
