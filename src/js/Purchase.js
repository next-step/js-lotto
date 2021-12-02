import { countLottoTemplate, fullLottoTemplate } from "./utils/templates.js";
import { makeLottoNumbers } from "./utils/functions.js";

export default class Purchase {
	constructor({
		count,
		purchasedLottos,
		$targetPurchaseInfo,
		$targetPurchaseCount,
		$targetPurchaseToggle,
		$targetLottoInfo,
	}) {
		this.count = count;
		this.purchasedLottos = purchasedLottos;
		this.$targetPurchaseInfo = $targetPurchaseInfo;
		this.$targetPurchaseCount = $targetPurchaseCount;
		this.$targetPurchaseToggle = $targetPurchaseToggle;
		this.$targetLottoInfo = $targetLottoInfo;

		const clickToggleEvent = () => {
			const lottoNumbersNodeList = this.$targetLottoInfo.querySelectorAll(
				".lotto-numbers"
			);
			if (this.$targetPurchaseToggle.checked) {
				this.$targetLottoInfo.classList.add("flex-col");
				lottoNumbersNodeList.forEach((node) => node.classList.remove("hidden"));
			} else {
				this.$targetLottoInfo.classList.remove("flex-col");
				lottoNumbersNodeList.forEach((node) => node.classList.add("hidden"));
			}
		};

		this.$targetPurchaseToggle.addEventListener("click", clickToggleEvent);
	}
	render() {
		if (this.count >= 1) {
			this.$targetPurchaseInfo.classList.remove("hidden");
			this.$targetPurchaseCount.innerText = countLottoTemplate(this.count);
			this.purchasedLottos = makeLottoNumbers(this.count);
			this.$targetLottoInfo.innerHTML = fullLottoTemplate(
				this.purchasedLottos,
				this.$targetPurchaseToggle.checked
			);
		}
	}
	setState(nextCount) {
		this.count = nextCount;
		this.render();
	}
}
