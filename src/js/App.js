import Payment from "./Payment.js";
import Purchase from "./Purchase.js";
import ResultModal from "./ResultModal.js";
import { makeLottoNumbers } from "./utils/service.js";
import WinningNumbers from "./WinningNumbers.js";

export default class App {
	constructor({ totalCount, manualLottos, autoLottos, purchasedLottos, winningNumberArray }) {
		this.totalCount = totalCount;
		this.manualLottos = manualLottos;
		this.autoLottos = autoLottos;
		this.purchasedLottos = purchasedLottos;
		this.winningNumberArray = winningNumberArray;

		this.payment = new Payment({
			$paymentForm: document.querySelector("#payment"),
			$paymentFormInput: document.querySelector(".payment-input"),
			setPurchaseTotalCount: (count) => {
				this.totalCount = count;
				this.purchase.setTotalCount(count);
				this.purchase.render();
				this.winningNumbers.render();
			},
		});

		this.purchase = new Purchase({
			totalCount: 0,
			manualCount: 0,
			purchasedLottos: this.purchasedLottos,
			manualLottos: this.manualLottos,
			autoLottos: this.autoLottos,
			$purchaseInfo: document.querySelector(".purchase-info"),
			$purchaseCount: document.querySelector(".purchase-count"),
			$purchaseToggle: document.querySelector(".purchase-toggle"),
			$lottoInfoManual: document.querySelector(".lotto-info-manual"),
			$manualNumbers: document.querySelector("#manual-numbers"),
			$manualNumberInputs: document.querySelectorAll(".manual-number"),
			$lottoInfo: document.querySelector(".lotto-info"),
			addManualNumbers: (numbersArray) => {
				this.manualLottos = [...this.manualLottos, numbersArray];
				this.purchase.setManualLottos(numbersArray);
			},
		});

		this.winningNumbers = new WinningNumbers({
			$showResultButton: document.querySelector(".open-result-modal-button"),
			$winningNumberInputs: document.querySelectorAll(".winning-number"),
			$bonusNumberInput: document.querySelector(".bonus-number"),
			$winningNumbers: document.querySelector("#winning-numbers"),
			setWinningNumbers: (numbersArray) => {
				this.winningNumberArray = numbersArray;
				const autoCount = this.totalCount - this.manualLottos.length;
				this.autoLottos = makeLottoNumbers(autoCount);
				this.purchase.setAutoLottos(this.autoLottos);
				this.purchasedLottos = [...this.manualLottos, ...this.autoLottos];
				this.purchase.setPurchasedLottos(this.purchasedLottos);
				this.resultModal.setLottoRank(
					this.purchasedLottos,
					this.winningNumberArray
				);
				this.resultModal.showModal();
			},
		});

		this.resultModal = new ResultModal({
			purchasedLottos: [],
			winningNumberArray: [],
			$modal: document.querySelector(".modal"),
			$modalClose: document.querySelector(".modal-close"),
			$resultTable: document.querySelector(".result-table"),
			$resultProfitRate: document.querySelector(".result-profit-rate"),
			$restartButton: document.querySelector(".restart"),
		});
	}
}
