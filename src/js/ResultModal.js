import { countLottoRank, calculateProfitRate } from "./utils/service.js";
import { resultLottoTemplate, profitRateTemplate } from "./utils/templates.js";
import { MESSAGE, CONSTANT } from "./utils/constants.js";

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

			const onModalClose = () => {
			this.$modal.classList.remove("open");
		};

		this.$modalClose.addEventListener("click", onModalClose);
		this.$restartButton.addEventListener("click", () => location.reload());
	}

	showModal() {
			this.$modal.classList.add("open");
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
