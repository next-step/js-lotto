import Payment from "./Payment.js";
import Purchase from "./Purchase.js";
import ResultModal from "./ResultModal.js";
import WinningNumbers from "./WinningNumbers.js";
import { makeLottoNumbers } from "./utils/service.js";

export default class App {
	constructor({ purchasedLottos, winningNumberArray }) {
		this.purchasedLottos = purchasedLottos;
		this.winningNumberArray = winningNumberArray;

		this.payment = new Payment({
			$paymentForm: document.querySelector("#payment"),
			$paymentFormInput: document.querySelector(".payment-input"),
			setPurchaseCount: (count) => {
				this.purchase.setCount(count);
				this.purchasedLottos = makeLottoNumbers(count);
				this.purchase.setPurchasedLottos(this.purchasedLottos);
				this.purchase.render();
				this.winningNumbers.render();
			},
		});

		this.purchase = new Purchase({
			count: 0,
			purchasedLottos: this.purchasedLottos,
			$purchaseInfo: document.querySelector(".purchase-info"),
			$purchaseCount: document.querySelector(".purchase-count"),
			$purchaseToggle: document.querySelector(".purchase-toggle"),
			$lottoInfo: document.querySelector(".lotto-info"),
		});

		this.winningNumbers = new WinningNumbers({
			$showResultButton: document.querySelector(".open-result-modal-button"),
			$winningNumberInputs: document.querySelectorAll(".winning-number"),
			$bonusNumberInput: document.querySelector(".bonus-number"),
			$winningNumbers: document.querySelector("#winning-numbers"),
			setWinningNumbers: (numbersArray) => {
				this.winningNumberArray = numbersArray;
				this.resultModal.setLottoRank(this.purchasedLottos, this.winningNumberArray);
			},
		});

		this.resultModal = new ResultModal({
			purchasedLottos: [],
			winningNumberArray: [],
			$showResultButton: document.querySelector(".open-result-modal-button"),
			$modal: document.querySelector(".modal"),
			$modalClose: document.querySelector(".modal-close"),
			$resultTable: document.querySelector(".result-table"),
			$resultProfitRate: document.querySelector(".result-profit-rate"),
			$restartButton: document.querySelector(".restart"),
		});
	}
}
