import { calculatePayment } from "./utils/functions.js";
// import { countLottoTemplate } from "./utils/templates.js";

export default class Payment {
	constructor({ $paymentForm, $paymentFormInput, setPurchaseCount }) {
		this.$paymentForm = $paymentForm;
		this.$paymentFormInput = $paymentFormInput;

		const clickSubmitEvent = (e) => {
			e.preventDefault();
			if (e.target.classList.contains("payment-submit")) {
				const countLotto = calculatePayment(this.$paymentFormInput.valueAsNumber);
				if (countLotto > 0) setPurchaseCount(countLotto);
			}
		};
		this.$paymentFormInput.addEventListener("click", (e) => (e.target.value = ""));
		this.$paymentForm.addEventListener("click", clickSubmitEvent);
	}
}
