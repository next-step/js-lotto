import { calculatePayment } from "./utils/functions.js";
import { countLottoTemplate } from "./utils/templates.js";

export default class Payment {
	constructor({ $targetPayment, onSubmit }) {
		this.$targetPayment = $targetPayment;
		this.$targetPaymentInput = document.querySelector(".payment-input");

		const clickSubmitEvent = (e) => {
			e.preventDefault();
			if (e.target.classList.contains("payment-submit")) {
				const countLotto = calculatePayment(
					Number(this.$targetPaymentInput.value)
				);
				if (countLotto > 0) onSubmit(countLotto);
			}
		};
		this.$targetPaymentInput.addEventListener(
			"click",
			(e) => (e.target.value = "")
		);
		this.$targetPayment.addEventListener("click", clickSubmitEvent);
	}
}
