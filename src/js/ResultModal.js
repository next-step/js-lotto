import { countLottoRank, calculateProfitRate } from "./utils/functions.js";
import { resultLottoTemplate, profitRateTemplate } from "./utils/templates.js";

export default class ResultModal {
	constructor({
		purchasedLottos,
		winningNumberArray,
		$showResultButton,
		$modal,
		$modalClose,
		$resultTable,
		$resultProfitRate,
		$restartButton,
	}) {
		this.purchasedLottos = purchasedLottos;
		this.winningNumberArray = winningNumberArray;
		this.$showResultButton = $showResultButton;
		this.$modal = $modal;
		this.$modalClose = $modalClose;
		this.$resultTable = $resultTable;
		this.$resultProfitRate = $resultProfitRate;
		this.$restartButton = $restartButton;

		const onModalShow = () => {
			if (this.purchasedLottos.length < 1) return
			if (new Set(this.winningNumberArray).size < 7) return
			this.$modal.classList.add("open");
		};

		const onModalClose = () => {
			this.$modal.classList.remove("open");
		};

		this.$showResultButton.addEventListener("click", onModalShow);
		this.$modalClose.addEventListener("click", onModalClose);
		this.$restartButton.addEventListener("click", () => location.reload())
	}

	render() {
		const lottoRank = countLottoRank(
			this.purchasedLottos,
			this.winningNumberArray
		);
		this.$resultTable.innerHTML = resultLottoTemplate(lottoRank);
		const profitRate = calculateProfitRate(
			lottoRank,
			this.purchasedLottos.length
		);
		this.$resultProfitRate.innerText = profitRateTemplate(profitRate);
	}

	setLottoRank(nextPurchasedLottos, nextWinningNumberArray) {
		this.purchasedLottos = nextPurchasedLottos;
		this.winningNumberArray = nextWinningNumberArray;
		this.render();
	}
}
