import { calculatePayment } from "./utils/service.js";

export default class Payment {
	constructor({ $paymentForm, $paymentFormInput, setPurchaseTotalCount }) {
		this.$paymentForm = $paymentForm;
		this.$paymentFormInput = $paymentFormInput;

		const onClickSubmit = (e) => {
			e.preventDefault();
			if (e.target.classList.contains("payment-submit")) {
				const money = this.$paymentFormInput.valueAsNumber;
				if (isNaN(money)) return;
				const countLotto = calculatePayment(money);
				if (countLotto > 0) setPurchaseTotalCount(countLotto);
			}
		};
		this.$paymentFormInput.addEventListener(
			"click",
			(e) => (e.target.value = "")
		);
		this.$paymentForm.addEventListener("click", onClickSubmit);
	}
}
