import { countLottoTemplate, fullLottoTemplate } from "./utils/templates.js";

export default class Purchase {
	constructor({
		count,
		purchasedLottos,
		$purchaseInfo,
		$purchaseCount,
		$purchaseToggle,
		$lottoInfo,
	}) {
		this.count = count;
		this.purchasedLottos = purchasedLottos;
		this.$purchaseInfo = $purchaseInfo;
		this.$purchaseCount = $purchaseCount;
		this.$purchaseToggle = $purchaseToggle;
		this.$lottoInfo = $lottoInfo;

		const clickToggleEvent = () => {
			if (this.$purchaseToggle.checked) {
				this.$lottoInfo.classList.add("flex-col");
			} else {
				this.$lottoInfo.classList.remove("flex-col");
			}
		};

		this.$purchaseToggle.addEventListener("click", clickToggleEvent);
	}
	render() {
		this.$purchaseInfo.classList.remove("hidden");
		this.$purchaseCount.innerText = countLottoTemplate(this.count);
		this.$lottoInfo.innerHTML = fullLottoTemplate(
			this.purchasedLottos,
			this.$purchaseToggle.checked
		);
	}
	setCount(nextCount) {
		this.count = nextCount;
	}
	setPurchasedLottos(nextPurchasedLottos) {
		this.purchasedLottos = nextPurchasedLottos;
	}
}
