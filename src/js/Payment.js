import { calculatePayment } from "./utils/functions.js";

export default class Payment {
	constructor({ $targetPayment, onSubmit }) {
		this.$targetPayment = $targetPayment;
		this.$targetPaymentInput = document.querySelector(".payment-input");

		const clickSubmitEvent = (e) => {
			e.preventDefault();
			if (e.target.classList.contains("payment-submit")) {
				onSubmit(calculatePayment(Number(this.$targetPaymentInput.value)));
			}
    };
    this.$targetPaymentInput.addEventListener("click", (e) => e.target.value = '')
		this.$targetPayment.addEventListener("click", clickSubmitEvent);
	}
}
