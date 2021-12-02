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

		const clickToggleEvent = (e) => {
			this.$targetLottoInfo.classList.toggle("flex-col");
			const lottoNumbersNodeList = this.$targetLottoInfo.querySelectorAll(
				".lotto-numbers"
			);
			lottoNumbersNodeList.forEach((node) => node.classList.toggle("hidden"));
		};
		this.$targetPurchaseToggle.addEventListener("click", clickToggleEvent);
	}
	render() {
		this.$targetPurchaseInfo.classList.remove("hidden");
		this.$targetPurchaseCount.innerText = countLottoTemplate(this.count);
		this.purchasedLottos = makeLottoNumbers(this.count);
		this.$targetLottoInfo.innerHTML = fullLottoTemplate(this.purchasedLottos);
	}
	setState(nextCount) {
		this.count = nextCount;
		this.render();
	}
}
