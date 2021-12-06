import { makeLottoNumbers } from "./utils/functions.js";
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
			const lottoNumbersNodeList = this.$lottoInfo.querySelectorAll(
				".lotto-numbers"
			);
			if (this.$purchaseToggle.checked) {
				this.$lottoInfo.classList.add("flex-col");
				lottoNumbersNodeList.forEach((node) => node.classList.remove("hidden"));
			} else {
				this.$lottoInfo.classList.remove("flex-col");
				lottoNumbersNodeList.forEach((node) => node.classList.add("hidden"));
			}
		};

		this.$purchaseToggle.addEventListener("click", clickToggleEvent);
	}
	render() {
		this.$purchaseInfo.classList.remove("hidden");
		this.$purchaseCount.innerText = countLottoTemplate(this.count);
		this.purchasedLottos = makeLottoNumbers(this.count);
		this.$lottoInfo.innerHTML = fullLottoTemplate(
			this.purchasedLottos,
			this.$purchaseToggle.checked
		);
	}
	setState(nextCount) {
		this.count = nextCount;
		this.render();
	}
}
